import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import EastIcon from '@mui/icons-material/East'
import { Link } from 'react-router-dom'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
// import { useDispatch } from 'react-redux'
// import { addToCart } from '~/redux/cart'
// import { toast } from 'react-toastify'
// import { useState } from 'react'
import { isEmpty } from 'lodash'
import { useEffect } from 'react'
import { API_GetProductById } from '~/apis'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { addToCart } from '~/redux/cart'

function ProductList({ products }) {
	console.log(' products: ', products)
	const dispatch = useDispatch()
	const handleAddToCard = (e, data) => {
		console.log(' data: ', data)
		toast('Đã thêm sản phẩm vào giỏ hàng')
		e.preventDefault()
		dispatch(addToCart({
			id: data.id,
			quantity: 1,
			totalQuantity: data.quantity
		}))
	}
	// useEffect(() => {
	// 	API_GetProductById(id).then()
	// }, [])
	return (
		<Box sx={{
			maxWidth: '100%',
			margin: '20px 0',
			backgroundColor: '#fff',
			padding: '0'
		}}>
			<Box sx={{
				maxWidth: {
					md: '1000px',
					lg: '1200px'
				},
				'& a': {
					textDecoration: 'none'
				},
				m: '0 auto',
				display: 'grid', gridTemplateColumns: ' repeat(4, 1fr)', gap: ' 0 20px'
			}}>
				{isEmpty(products) && <Box sx={{ p: '28px 0' }}>
					<Typography variant='h5' sx={{ color: '#000' }}>Chưa có sản phẩm</Typography>
				</Box>
				}
				{!isEmpty(products) && products?.map(item => (
					<Link to={`/product/${item._id}`} key={item._id} >
						<Card
							sx={{
								minHeight: '440px',
								maxHeight: '440px',
								backgroundColor: '#fff',
								p: '16px',
								mb: '24px',
								color: 'primary.main',
								position: 'relative',
								cursor: 'pointer',
								textDecoration: 'none',
								// transition: 'all linear .3s',
								'&:hover': {
									boxShadow: '0 0 20px 0 #ffc0cb'
								},
								'&:hover .MuiBox-root': {
									opacity: '1'
								},
								'&:hover .MuiBox-root .MuiButton-root ': {
									transform: 'translateY(0)'
								}
							}}>
							<Box sx={{
								background: `url(${item.thumb}) no-repeat top / cover`,
								position: 'absolute',
								overflow: 'hidden',
								top: '0',
								left: '0',
								right: '0',
								bottom: '0',
								display: 'flex',
								alignItems: 'flex-end',
								justifyContent: 'center',
								zIndex: '1',
								opacity: '0',
								transition: 'all linear .3s',
								padding: '10px',
								boder: '1px solid #fff'
							}}

							>
								<Button variant="contained"
									endIcon={<AddShoppingCartIcon />}
									onClick={(e) => {
										handleAddToCard(e, { id: item._id, quantity: item.quantity })
									}}
									sx={{
										backgroundColor: 'primary.main',
										color: '#fff',
										transform: 'translateY(20px)',
										transition: 'all linear .3s',
										mb: '16px',
										borderRadius: '8px',
										'&:hover': {
											backgroundColor: 'primary.main',
											boxShadow: '0 0 20px 0 #ffc0cb',
										}
									}}> Thêm vào giỏ hàng</Button>
							</Box>
							<CardMedia
								component="img"
								height='320px'
								width='320px'
								image={item.thumb}
								alt={item.price}
								sx={{ borderRadius: '4px', objectFit: 'fill ' }}
							/>

							{!!item.precent &&
								<Box sx={{
									backgroundColor: '#ff5e57',
									position: 'absolute',
									top: '0',
									left: '0',
									p: '8px',
									color: '#fff',
									borderRadius: '4px'
								}}> {`- ${item.precent}% `}</Box>}

							<CardContent sx={{ p: '8px 0', }}>

								<Typography variant="h5" component="div" sx={{ textAlign: 'left', textTransform: 'capitalize', textDecoration: 'none' }}>
									{item.name === '' ? 'noname' : item.name}
								</Typography>
								<Typography variant="h6" component="div" sx={{ textAlign: 'left', textTransform: 'capitalize', textDecoration: 'none', textOverflow: 'ellipsis', textWrap: 'nowrap', maxWidth: '320px', overflow: 'hidden' }}>
									{item.title === '' ? 'noname' : item.title}
								</Typography>

								<Box sx={{ display: 'flex', gap: '4px', '& .MuiTypography-root.MuiTypography-body1 ': { fontSize: '1rem' } }}>
									<Typography variant="body1" component="h6" sx={{ color: '#000' }}>
										{parseFloat(`${(item.price - (item.price * (item.precent / 100)))}`).toFixed(1) + '00 VND'}
									</Typography>

									{
										!!item.precent &&
										<Typography gutterBottom variant="body1" component="h6" sx={{ textDecoration: 'line-through', color: '#888', ml: '4px' }}>
											{`${item.price}.000 vnd`}
										</Typography>
									}

								</Box>

							</CardContent>
						</Card>
					</Link>
				))
				}


			</Box >

		</Box >
	)
}
export default ProductList
