import Header from "~/components/Header"
import Footer from '~/components/Footer'
import Slide from "~/components/Slide"
import { Box, Button, Card, CardContent, CardHeader, CardMedia, patch, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import EastIcon from '@mui/icons-material/East'
import { useNavigate } from "react-router-dom"
import { API_GetAllBrand } from "~/apis"
import { useSelector, useDispatch } from 'react-redux'
import { fetchWebInfo } from "~/redux/info"

function Brand({ info }) {
	const [brandList, setBrandList] = useState([])
	const [slide, setSlide] = useState(undefined)
	console.log(' slide: ', slide)
	const navigate = useNavigate()
	useEffect((() => {
		API_GetAllBrand().then(data => {
			console.log(' data: ', data)
			setBrandList(data.brandList)
			setSlide(data.slide.thumb)
		})
			.catch(err => console.log('err brand: ', err)
			)
	}), [])
	return (
		<Box>
			<Header />
			<Slide data={slide} />

			<Box sx={{ minWidth: '1200px', maxWidth: '1200px', m: '0 auto 80px' }}>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '20px' }}>
					<Typography variant="h2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>Các nhãn hàng của chúng tôi</Typography>
				</Box>
				<Box sx={{ display: 'grid', gridTemplateColumns: ' repeat(4, 1fr)', gap: '40px 20px' }}>
					{brandList && brandList?.map((brand) => {
						return (
							<Card key={brand?._id}
								onClick={() => {
									navigate(`/brands/${brand?._id}`)
								}}
								sx={{
									'&:hover': {
										cursor: 'pointer',
										boxShadow: '0 0 12px 0 #ca1a75'
									},

									'& .MuiCardHeader-root': {
										color: 'primary.main',
										border: '1px solid #ca1a75',
										borderBottom: 'none'
									},
									'& .MuiCardMedia-root': {
										backgroundColor: 'primary.dark',
										p: '12px 20px',
										border: '1px solid #ca1a75',
										borderTop: 'none'
									}
								}} >
								<CardHeader
									title={brand?.name} />
								<CardMedia
									component="img"
									image={brand?.logo}
									alt={brand?.name}
								/>
							</Card>
						)
					})}

				</Box>
			</Box>
			<Footer data={info} />
		</Box>
	)
}

export default Brand
