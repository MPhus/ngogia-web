import Pagination from '@mui/material/Pagination'
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useEffect, useState } from 'react'
import ProductList from './ProductList'
import { isEmpty } from 'lodash'
import Slide from '~/components/Slide'
import { PRODUCT_LIST_MOCK } from '~/apis/mockdata'
import InputAdornment from '@mui/material/InputAdornment'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import SearchIcon from '@mui/icons-material/Search'

import TextField from '@mui/material/TextField'
import { API_GetAllBrand, API_getProduct } from '~/apis'
function Product({ brandId, info }) {
	const [searchtext, setSearchtext] = useState('')
	const [filter, setFilter] = useState({
		page: 1,
		limit: 12,
		price: 'latest',
		brandId: brandId || "",
		uses: '',
		searchtext,
		isGetSoldOut: false

	})

	const [products, setProducts] = useState([])
	const [closeIcon, setCloseIcon] = useState('')

	const [brandList, setBrandList] = useState([])
	const [slide, setSlide] = useState(undefined)

	useEffect(() => {

		API_getProduct(filter).then(data => setProducts(data))


	}, [filter, searchtext])
	const totalPage = products?.totalPage
	const handlePageShowProduct = (e, v) => {
		setFilter({
			...filter,
			page: v,
		})
	}
	useEffect(() => {
		return () => {
			setFilter({
				...filter,
				page: 1,
			})
		}
	}, [])
	useEffect(() => {
		API_GetAllBrand().then(data => {
			setBrandList(data.brandList)
			setSlide(data.slide.thumb)
		})
	}, [])
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [filter.page])
	return (
		<Box sx={{
			overflow: 'hidden'
		}}>
			<Header />
			<Slide data={slide} />
			<Box sx={{
				maxWidth: {
					md: '800px',
					lg: '1200px'
				},
				margin: '20px auto 0',
			}}>
				<TextField
					id="filled-search"
					label="Tìm kiếm"
					type="text"
					variant="outlined"

					fullWidth
					onChange={(e) => {
						setSearchtext(e.target.value)
						setFilter({ ...filter, searchtext: e.target.value, page: 1 })
					}}
					value={searchtext}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon sx={{

									fill: '#ca1a75',
									fontSize: '24px'
								}} />
							</InputAdornment>
						),
						endAdornment: (
							<InputAdornment position="end">
								<CloseRoundedIcon onClick={() => setCloseIcon('')}
									sx={{
										display: searchtext !== '' ? 'block' : 'none',
										cursor: 'pointer',
										fill: '#ca1a75',
										fontSize: '24px'
									}}
								/>
							</InputAdornment>
						)
					}}
					sx={{
						color: 'primary.contrastText',
						'& .MuiSvgIcon-root': {
							pt: '3px'
						},
						'& .MuiFormLabel-root': {
							right: 'unset !important',
							left: '0',
							top: '-4px',
							color: ' #ca1a75!important',
							fontSize: '24px !important',
							backgroundColor: '#fff'
						},
						'&  .MuiOutlinedInput-root ': {
							color: 'primary.contrastText',
							fontSize: '20px',
							' & .MuiOutlinedInput-notchedOutline': {
								border: '2px solid #ca1a75 !important'
							}
						}
					}}
				/>
			</Box>
			{/* Navigationnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn */}
			<Box sx={{
				bgcolor: '#FFF',
				maxWidth: {
					md: '800px',
					lg: '1200px'
				},
				margin: '12px auto 0',
				display: 'flex',
				pb: '20px',
				flexDirection: {
					xs: 'column',
					md: 'row'
				},
				justifyContent: 'space-between',
				alignItems: {
					xs: 'center',
					md: 'flex-end'
				},
				borderBottom: '4px solid #000'
			}}>

				<Box sx={{
					display: 'flex',
					gap: {
						xs: '0', lg: '20px'
					},
					maxWidth: {
						xs: '100%',
						sm: '70%',
						md: '500px'
					},
					minWidth: {
						xs: '100%',
						sm: '70%',
						md: '500px'
					},
					justifyContent: 'flex-start'
				}}>
					{/* ----------------------------------filterColor------------------------------------------------ */}
					<Box sx={{
						minWidth: '30%'
					}} >
						<FormControl sx={{
							minWidth: {
								xs: '100%',
								'& .MuiFormLabel-root': {
									right: 'unset !important',
									left: '0',
									color: ' #ca1a75!important',
									fontSize: '18px !important',
									backgroundColor: '#fff'
								},
								'&  .MuiOutlinedInput-root ': {
									color: 'primary.contrastText',
									fontSize: '18px',
									' & .MuiOutlinedInput-notchedOutline': {
										border: '1px solid #000 !important'
									}
								}
							}
						}}>
							<InputLabel sx={{ color: 'red' }} >Nhãn hàng</InputLabel>
							<Select
								value={filter.brandId || ''}
								onChange={(e) => { setFilter({ ...filter, brandId: e.target.value, page: 1 }) }}
								inputProps={{ MenuProps: { disableScrollLock: true } }}
							>
								<MenuItem value={''}>None</MenuItem>
								{!isEmpty(brandList) && brandList?.map(brand => <MenuItem value={brand._id}>{brand.name}</MenuItem>
								)}
							</Select>
						</FormControl>
					</Box>

					{/* ----------------------------------filterSize------------------------------------------------ */}
					<Box sx={{
						minWidth: '36%'
					}}>
						<FormControl sx={{
							minWidth: {
								xs: '100%',
								'& .MuiFormLabel-root': {
									right: 'unset !important',
									left: '0',
									color: ' #ca1a75!important',
									fontSize: '18px !important',
									backgroundColor: '#fff'
								},
								'&  .MuiOutlinedInput-root ': {
									color: 'primary.contrastText',
									fontSize: '18px',
									' & .MuiOutlinedInput-notchedOutline': {
										border: '1px solid #000 !important'
									}
								}
							}
						}} >
							<InputLabel id="size-select-label" >Danh mục</InputLabel>
							<Select
								value={filter.uses}
								inputProps={{ MenuProps: { disableScrollLock: true } }}
								onChange={(e) => {
									setFilter({
										...filter,
										uses: e.target.value, page: 1
									})
								}}
							>
								<MenuItem value=''>Tất cả</MenuItem>
								<MenuItem value={'face'}>Dành cho mặt</MenuItem>
								<MenuItem value={'body'}>Toàn thân</MenuItem>
								<MenuItem value={'home'}>Sản phẩm vệ sinh</MenuItem>\
							</Select>
						</FormControl>
					</Box>

				</Box>

				{/*------------------------filterPrice--------------------------------  */}
				<Box sx={{
					maxWidth: {
						xs: '100%',
						md: '200px'
					},
					minWidth: {
						xs: '100%',
						md: '200px'
					},
					mb: '8px',
					background: 'transparent',
					'& .MuiInputBase-root': {
						color: 'primary.main',
						fontSize: '18px',
						'& div': {
							p: ' 8px 12px'
						},
						'& .MuiOutlinedInput-notchedOutline': {
							border: '1px solid #000',
							borderColor: '#000'
						}
					}
				}}>
					<FormControl fullWidth>

						<Select
							value={filter.price}
							inputProps={{ MenuProps: { disableScrollLock: true } }}
							onChange={(e) => {
								setFilter({
									...filter,
									price: e.target.value, page: 1
								})
							}}
						>
							<MenuItem value={'latest'}>Mới nhất</MenuItem>
							<MenuItem value={'increase'}>Tăng dần</MenuItem>
							<MenuItem value={'decrease'}>Giảm dần</MenuItem>
						</Select>
					</FormControl>
				</Box>

			</Box>
			{products && <ProductList products={products?.data} />}


			<Pagination
				onChange={handlePageShowProduct}
				size='large'
				page={filter.page}
				count={totalPage}
				defaultPage={1}
				variant="outlined"
				sx={{
					maxWidth: '1200px',
					margin: ' 0 auto',
					padding: {
						xs: '0 0 100px 0',
						md: '0 40px 100px 0'
					},
					'& .MuiPagination-ul': {
						justifyContent: {
							xs: 'center',
							md: 'flex-end'
						}
					},
					'& .MuiButtonBase-root': {
						color: 'primary.dark'
					},
					'& .MuiPaginationItem-root': {
						borderColor: 'primary.main'
					},
					'& .MuiPaginationItem-root:hover': {
						opacity: '0.8'
					}

				}} />
			<Footer data={info} />
		</Box >
	)
}
export default Product