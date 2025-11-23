import { useEffect, useState } from 'react'
import Header from "~/components/Header"
import Footer from "~/components/Footer"
import { Box, Typography } from '@mui/material'
import BlogInTheCenter from "~/components/BlogInTheCenter"
import { BRAND_LIST_MOCK } from '~/apis/mockdata'
import { useParams } from 'react-router-dom'
import { API_GetBrandById, API_getProduct } from '~/apis'
import ProductList from '../Product/ProductList'

function Brand_id({ info }) {
	let { id } = useParams()
	const [data, setData] = useState({})
	const [productList, setProductList] = useState([])
	useEffect(() => {
		API_GetBrandById(id).then(data => setData(data))
			.catch(err => console.log('err:', err))
	}, [])
	useEffect(() => {
		API_getProduct({
			page: 1,
			limit: 4,
			price: 'latest',
			brandId: id,
			uses: '',
			searchtext: '',
			isGetSoldOut: false

		}).then(data => setProductList(data))
			.catch(err => console.log('err:', err))
	}, [])
	const [windowWidth, setWindowWidth] = useState(window.innerWidth)
	const [isShow, setIsShow] = useState(false)

	const originContent = data?.des?.split('\n')
	const originContentLength = originContent?.length

	const [contents, setContents] = useState(originContent)
	const handleShowAllContent = () => {
		setIsShow(false)
		setContents(originContent)
	}
	useEffect(() => {
		if (windowWidth < 1200 && originContentLength > 3) {
			const contentsTemp = contents?.filter((t, i) => i <= 2)
			setIsShow(true)
			setContents(contentsTemp)
		} else {
			handleShowAllContent()
		}
	}, [windowWidth, data])

	useEffect(() => {
		const hadleResize = (event) => {

			setWindowWidth(event.srcElement.innerWidth)
		}
		window.addEventListener('resize', hadleResize)
		return () => {
			window.removeEventListener('resize', hadleResize)
		}
	}, [])
	return (
		<Box>
			<Header />
			<Box sx={{
				backgroundColor: 'background.default',
				color: 'text.primary',
				p: '40px 0',
				mt: '80px'
			}}>
				<Box sx={{
					maxWidth: {
						xs: '100%',
						md: '960px',
						lg: '1200px'
					},
					margin: '0 auto ',
					textAlign: 'center',
					padding: {
						xs: ' 0 32px',
						md: 'none'
					},
					'& .MuiTypography-root.MuiTypography-h1': {
						fontWeight: '300',
						fontSize: {
							xs: '28px',
							md: '32px'
						},
						lineHeight: {
							sx: '28px',
							md: '44px'
						},
						letterSpacing: '4px',
						p: {
							xs: '20px 0',
							md: '32px 0'
						},
						fontFamily: 'fontPE'
					},
					'& .MuiTypography-root.MuiTypography-body1': {
						fontSize: '16px',
						letterSpacing: '2px',
						fontFamily: 'fontPE',
						mb: {
							xs: '8px',
							md: '16px'
						}
					}
				}}>
					<Typography variant="h3">{data?.name}</Typography>

					<img src={data?.logo}
						alt=""
						style={{
							maxWidth: '200px',
							marginTop: '32px'
						}}
					/>


					<Box>
						{contents?.map((content, index) => {
							return (
								<Typography
									variant="body1"
									component="p" key={index}
								>
									{content}
								</Typography>
							)
						}
						)}
						{isShow && <Typography
							variant="body1"
							component="p"
							onClick={() => handleShowAllContent()}
							sx={{ cursor: 'pointer', fontWeight: 'bold' }}
						>
							Xem thêm
						</Typography>}
					</Box>
					<img src={data?.thumb}
						alt=""
						style={{
							maxWidth: '200px',
							marginTop: '32px'
						}}
					/>

				</Box >
			</Box>
			<Box sx={{
				maxWidth: {
					xs: '100%',
					md: '960px',
					lg: '1200px'
				},
				margin: '0 auto '
			}}>
				<Typography variant="h3">Các sản phẩm nổi bậc</Typography>
				{productList && <ProductList products={productList?.data} />}
			</Box>
			<Footer data={info} />
		</Box>
	)
}

export default Brand_id
