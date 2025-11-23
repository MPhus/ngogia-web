import axios from 'axios'
// import authorizedAxiosIntance from '~/untils/authorizedAxios'
import { API_ROOT } from '~/untils/contant'
import { API_CITY } from '~/untils/contant'
export const fetchCityAPI = async () => {
	const response = await axios.get(`${API_CITY}`)
	return response.data
}
export const API_GetHomePage = async (slug) => {
	const response = await axios.get(`${API_ROOT}/v1/pages/${slug}`)
	return response.data
}
export const API_GetInfo = async () => {
	const response = await axios.get(`${API_ROOT}/v1/info`)
	return response.data
}
export const API_GetHotNews = async (limit) => {
	const response = await axios.get(`${API_ROOT}/v1/news?limit=${limit}`)
	return response.data
}
export const API_getNewsById = async (id) => {
	const response = await axios.get(`${API_ROOT}/v1/news/${id}`)
	return response.data
}
export const API_getOverview = async (id) => {
	const response = await axios.get(`${API_ROOT}/v1/news/overview`)
	return response.data
}
export const API_GetAllBrand = async () => {
	const response = await axios.get(`${API_ROOT}/v1/brands`)
	return response.data
}
export const API_GetBrandById = async (id) => {
	const response = await axios.get(`${API_ROOT}/v1/brands/${id}`)
	return response.data
}
export const API_GetProductById = async (id) => {
	const response = await axios.get(`${API_ROOT}/v1/products/${id}`)
	return response.data
}
export const API_createNewOrder = async (data) => {
	const response = await axios.post(`${API_ROOT}/v1/order`, data)
	return response.data
}
export const API_veriryOderToken = async (token) => {
	const response = await axios.get(`${API_ROOT}/v1/order/verifyMail?token=${token}`)
	return response.data
}
export const API_getProduct = async (filter) => {
	console.log(' filter: ', filter)
	const { price, brandId, uses, searchtext, isGetSoldOut, page, limit } = filter
	const response = await axios.get(`${API_ROOT}/v1/products?brandId=${brandId}&uses=${uses}&page=${page}&limit=${limit}&price=${price}&searchtext=${searchtext}&isGetSoldOut=${isGetSoldOut}`)
	return response.data
}
export const uploadTest = async (data) => {
	const response = await axios.post(`${API_ROOT}/v1/uploadTest`, data, {
		headers: {
			'Content-Type': 'multipart/form-data'
			,
			timeout: 0
		}
	})
	return response.data
}