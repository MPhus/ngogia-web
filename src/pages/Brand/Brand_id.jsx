import { useEffect, useState } from 'react'
import Header from "~/components/Header"
import Footer from "~/components/Footer"
import { Box, Button, Typography } from '@mui/material'
import BlogInTheCenter from "~/components/BlogInTheCenter"
import { BRAND_LIST_MOCK } from '~/apis/mockdata'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { API_GetBrandById, API_getProduct } from '~/apis'
import ProductList from '../Product/ProductList'
import useContentTruncation from '~/components/useContentTruncation'
import OverViewInTheLeft from '~/components/OverViewInTheLeft'
import Slide from '~/components/Slide'

import EastIcon from '@mui/icons-material/East'
function Brand_id({ info }) {
	const navigate = useNavigate()


	let { id } = useParams()
	const [blogId, setBlogId] = useState({})
	const [productList, setProductList] = useState([])
	const handleGo = () => {
		navigate("/product", {
			state: {
				brandId: id,
			},
		})
	}
	useEffect(() => {
		API_GetBrandById(id).then(data => setBlogId(data))
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

	return (
		<Box>
			<Header />
			{
				blogId?.thumb && <Slide data={blogId?.thumb} />
			}

			<Box sx={{ m: blogId?.thumb ? '40px 0' : '120px 0 40px 0 ' }}>
				{blogId?.des && blogId?.des?.map((data, index) => <Box key={data?._id} >
					<OverViewInTheLeft data={{ ...data, logo: blogId?.logo, color: blogId?.color }} isRight={index % 2} isBrand={blogId?.logo && !index % 2} />
				</Box>
				)}
			</Box>
			<Box sx={{
				maxWidth: {
					xs: '100%',
					md: '960px',
					lg: '1200px'
				},
				margin: '80px auto '
			}}>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<Typography variant="h3"
						sx={{
							color: blogId.color ? blogId.color : 'primary.main',
							p: '0 20px',
							fontSize: { xs: '2rem', sm: '3rem ' }

						}}>
						Các sản phẩm nổi bậc</Typography>

					<Button
						variant='outlined'
						sx={{
							color: blogId.color ? blogId.color : 'primary.main',
							padding: { xs: '12px 20px', sm: '12px 20px' },
							fontSize: '1.2rem',
							textTransform: 'uppercase',
							minWidth: { xs: '200px', xl: '320px' },
							justifyContent: 'space-between',
							border: '1px solid',
							borderColor: blogId.color ? blogId.color : 'primary.main',
							'&:hover': {
								opacity: '0.8',
								backgroundColor: 'tranparent '
							},
							'& .MuiSvgIcon-root': {
								fontSize: '28px !important'
							}
						}} endIcon={< EastIcon sx={{ fontSize: '1rem' }} />}
						onClick={handleGo}
					>Các sản phẩm khác của&nbsp; <strong>{blogId?.name}</strong></Button>
				</Box>

				{productList && <ProductList products={productList?.data} />}

			</Box>
			<Footer data={info} />
		</Box>
	)
}

export default Brand_id
