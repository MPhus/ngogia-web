import { Routes, Route, useParams, Outlet, Navigate } from 'react-router-dom'
import Home from './pages/Home/Home'
import Overview from './pages/Overview/Overview'
import Blogs from './pages/Blogs/Blogs'
import Brand from './pages/Brand/Brand'

import Blog_id from './pages/Blogs/Blog_id'
import Product from './pages/Product/Product'
import ProductDetail from './pages/Product/ProductDetail'
import Brand_id from './pages/Brand/Brand_id'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWebInfo } from './redux/info'
import { useEffect } from 'react'
import Cart from './pages/Cart/Cart'
import Checkout from './pages/Checkout/Checkout'
import { isEmpty } from 'lodash'
import VerifyOrder from './pages/Veriry/VerifyOrder'
import Admin from './pages/Admin/Admin'
import Login from './pages/Login/Login'



function App() {
  const dispatch = useDispatch()
  const { info, status, error } = useSelector(state => state.info)
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchWebInfo())
    }
  }, [])
  const ProtectCheckOutRoute = () => {
    const item = JSON.parse(localStorage.getItem(`cartItems`))
    if (isEmpty(item)) {
      return (
        <Navigate to={`/`} replace={true} />
      )
    }
    return (
      <Outlet />
    )
  }
  const ProtectedRouteAdmin = () => {
    const user = JSON.parse(localStorage.getItem(`userInfo`))
    if (!user) {
      return (
        <Navigate to={`/login`} replace={true} />
      )
    }
    return (
      <Outlet />
    )
  }
  const AuthorizeRoute = () => {
    const user = JSON.parse(localStorage.getItem(`userInfo`))
    if (user) {
      let toRoute = `admin`
      return (
        <Navigate to={toRoute} replace={true} />
      )
    }
    return (
      <Outlet />
    )
  }
  if (!!info) {
    return (
      <Routes>
        <Route path='/' element={<Home info={info} />} />
        <Route path='/overview' element={<Overview info={info} />} />
        <Route path='/cart' element={<Cart info={info} />} />
        <Route path='/product' element={<Product info={info} />} />
        <Route path='/product/:id' element={<ProductDetail info={info} />} />
        <Route path='/blogs/:id' element={<Blog_id info={info} />} />
        <Route path='/brands' element={<Brand info={info} />} />
        <Route path='/brands/:id' element={<Brand_id info={info} />} />
        <Route element={<ProtectCheckOutRoute />}>
          <Route path='/checkout' element={<Checkout info={info} />} />
        </Route>
        <Route path='/verifyMail/:token' element={<VerifyOrder />} />


        <Route element={<AuthorizeRoute />}>
          <Route path='/login' element={<Login />} />
        </Route>

        <Route element={<ProtectedRouteAdmin />}>
          <Route path='/admin' element={<Admin />} />
        </Route>

      </Routes>

    )
  }
}

export default App
