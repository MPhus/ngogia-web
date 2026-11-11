import axios from 'axios'
import {
	collection, doc, getDoc, getDocs, query, where, addDoc, updateDoc, serverTimestamp, Timestamp
} from 'firebase/firestore'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { db, auth } from '~/untils/firebase'
import { API_CITY } from '~/untils/contant'
import { sendConfirmOrderMail, sendNoPriceOrderMails } from '~/untils/emailjs'

// ---------------------------------------------------------------- helpers
const normalize = (v) => {
	if (v instanceof Timestamp) return v.toDate().toISOString()
	if (Array.isArray(v)) return v.map(normalize)
	if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, normalize(x)]))
	return v
}
const fromSnap = (snap) => (snap.exists() ? { _id: snap.id, ...normalize(snap.data()) } : null)
const getAll = async (name, ...constraints) => {
	const snap = await getDocs(query(collection(db, name), ...constraints))
	return snap.docs.map(fromSnap)
}
const getOneWhere = async (name, field, value) => {
	const list = await getAll(name, where(field, '==', value))
	return list[0] || null
}
const time = (x) => (x ? new Date(x).getTime() : 0)
// Names starting with a latin letter first, then the rest (same as the old $regexMatch sort)
const byName = (a, b) => {
	const la = /^[A-Za-z]/.test(a.name || '') ? 0 : 1
	const lb = /^[A-Za-z]/.test(b.name || '') ? 0 : 1
	return la - lb || (a.name || '').localeCompare(b.name || '')
}

// Catalog is small and has no regex search in Firestore -> load once, filter/sort/paginate on the client.
// Cached in memory + localStorage (10 min) to stay far below the Spark plan's 50k reads/day.
const PRODUCTS_CACHE_KEY = 'productsCache:v1'
const PRODUCTS_TTL = 10 * 60 * 1000
let productsCache = null
const readStoredProducts = () => {
	try {
		const { at, data } = JSON.parse(localStorage.getItem(PRODUCTS_CACHE_KEY))
		return Date.now() - at < PRODUCTS_TTL ? data : null
	} catch {
		return null
	}
}
const loadProducts = () => {
	if (!productsCache) {
		const stored = readStoredProducts()
		productsCache = stored
			? Promise.resolve(stored)
			: getAll('products').then((data) => {
				try { localStorage.setItem(PRODUCTS_CACHE_KEY, JSON.stringify({ at: Date.now(), data })) } catch { /* quota full: ignore */ }
				return data
			}).catch((e) => { productsCache = null; throw e })
	}
	return productsCache
}

// ---------------------------------------------------------------- public API
export const fetchCityAPI = async () => {
	const response = await axios.get(`${API_CITY}`)
	return response.data
}

export const API_GetHomePage = async (slug) => {
	if (slug) return getOneWhere('pages', 'name', slug)
	const [homePage, overview, hotProduct] = await Promise.all([
		getOneWhere('pages', 'name', ''),
		getOneWhere('pages', 'name', 'overview'),
		getAll('products', where('isHotProduct', '==', true)).then((l) => l[0])
	])
	return { ...homePage, overview, hotProduct }
}
export const API_GetInfo = async () => getOneWhere('pages', 'justInfo', true)

export const API_GetHotNews = async (limit) => {
	const list = (await getAll('news')).filter((n) => n.isOverview === undefined)
	list.sort((a, b) => time(b.createAt) - time(a.createAt))
	return list.slice(0, Number(limit) || list.length)
}
export const API_getNewsById = async (id) => fromSnap(await getDoc(doc(db, 'news', id)))
export const API_getOverview = async () => (await getAll('news')).filter((n) => n.isOverview !== undefined)

export const API_GetAllBrand = async () => {
	const [brandList, slide] = await Promise.all([
		getAll('brands').then((l) => l.sort(byName)),
		getOneWhere('slides', 'page', 'brand')
	])
	return { brandList, slide }
}
export const API_GetBrandById = async (id) => fromSnap(await getDoc(doc(db, 'brands', id)))

export const API_GetProductById = async (id) => fromSnap(await getDoc(doc(db, 'products', id)))
export const API_getProduct = async (filter) => {
	const { price, brandId, uses, searchtext, isGetSoldOut, page, limit } = filter
	const text = (searchtext || '').toLowerCase()
	let list = (await loadProducts()).filter((p) =>
		(!brandId || p.brandId === brandId) &&
		(!uses || p.uses === uses) &&
		(isGetSoldOut === 'true' || isGetSoldOut === true || p.quantity > 0) &&
		(!text || [p.name, p.title, p.uses].some((f) => (f || '').toLowerCase().includes(text)))
	)
	list = [...list].sort(
		price === 'increase' ? (a, b) => a.price - b.price
			: price === 'decrease' ? (a, b) => b.price - a.price
				: byName
	)
	const lim = Number(limit) || 12
	const pg = Number(page) || 1
	return {
		maxProductOfPage: lim,
		page: pg,
		totalProduct: list.length,
		totalPage: Math.ceil(list.length / lim),
		data: list.slice((pg - 1) * lim, pg * lim)
	}
}

// ---------------------------------------------------------------- orders
const toOrderDoc = ({ info, productList, totalPrice, tranportFee, type }) => ({
	customerEmail: info.email,
	customerFullname: info.fullname,
	customerPhone: info.phone,
	payMethod: info.payMethod || 'cash',
	note: info.note || '',
	productList: productList.map((p) => ({ productID: p._id, quantity: p.quantityInCart })),
	totalPrice: parseInt(totalPrice),
	tranportFee: parseInt(tranportFee) || 0,
	type: type || 'online',
	status: 'pending',
	createAt: serverTimestamp()
})

// Saves a pending order, then mails a confirmation link /verifyMail/<orderId> (valid 5 minutes, enforced by rules)
export const API_createNewOrder = async (data) => {
	const ref = await addDoc(collection(db, 'orders'), toOrderDoc(data))
	return sendConfirmOrderMail(data, `${window.location.origin}/verifyMail/${ref.id}`)
}
export const API_createNewOrderNoPrice = async (data) => sendNoPriceOrderMails(data)
export const API_veriryOderToken = async (token) => {
	await updateDoc(doc(db, 'orders', token), { status: 'confirmed', confirmedAt: serverTimestamp() })
	return { message: 'Is valid' }
}

// ---------------------------------------------------------------- auth
export const API_login = async (email, password) => {
	const { user } = await signInWithEmailAndPassword(auth, email, password)
	return { id: user.uid, email: user.email }
}
export const handleLogoutAPI = async () => {
	await signOut(auth)
}
export const API_getCurrentUser = async () => {
	await auth.authStateReady()
	const u = auth.currentUser
	return u ? { id: u.uid, email: u.email } : null
}

// ---------------------------------------------------------------- uploads (Cloudinary unsigned preset)
export const uploadTest = async (formData) => {
	const files = formData.getAll('thumb')
	const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`
	const data = await Promise.all(files.map(async (file) => {
		const body = new FormData()
		body.append('file', file)
		body.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)
		const res = await axios.post(url, body)
		return { path: res.data.secure_url, filename: res.data.public_id, originalname: file.name }
	}))
	return { data }
}