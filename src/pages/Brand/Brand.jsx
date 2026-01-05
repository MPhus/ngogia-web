import Header from "~/components/Header"
import Footer from '~/components/Footer'
import Slide from "~/components/Slide"
import { Box, Button, Card, CardContent, CardHeader, CardMedia, patch, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import EastIcon from '@mui/icons-material/East'
import { useNavigate } from "react-router-dom"
import { API_GetAllBrand, uploadTest } from "~/apis"
import { useForm } from "react-hook-form"

function Brand({ info }) {
	const [brandList, setBrandList] = useState([])
	const [slide, setSlide] = useState(undefined)
	const navigate = useNavigate()
	useEffect((() => {
		API_GetAllBrand().then(data => {
			setBrandList(data.brandList)
			setSlide(data.slide.thumb)
		})
			.catch(err => console.log('err brand: ', err)
			)
	}), [])
	const handleSubmitForm = async (data) => {
		console.log('đã click')

		try {
			const formData = new FormData()
			for (let i = 0; i < data?.files.length; i++) {
				formData.append("thumb", data?.files[i])
			}
			for (const [key, value] of formData.entries()) {
				console.log(key, value)
			}
			const test = await uploadTest(formData)
			reset()
			console.log(' test: ', JSON.stringify(test.data))
		} catch (error) {
			console.log(' error: ', error)

		}

	}
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm()
	return (
		<Box>
			<Header />
			<Slide data={slide} />

			<Box sx={{
				maxWidth: {
					md: '1000px',
					lg: '1200px'
				},
				m: '0 auto 80px',
			}}>
				<Box sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					mb: '20px'
				}}>
					<Typography variant="h2"
						sx={{
							fontWeight: 'bold',
							color: 'primary.main',
							p: { xs: '0 20px', sm: '0 40px', lg: '0 20px' },
							mt: { xs: '20px', lg: 'unset' },
							fontSize: { xs: '2rem', sm: '3rem' }
						}}>
						Các nhãn hàng của chúng tôi
					</Typography>

				</Box>
				<Box sx={{
					display: 'flex',
					flexWrap: 'wrap',

					// 💡 Thay đổi chính:
					justifyContent: { xs: 'space-between', sm: 'space-evenly', lg: 'flex-start' }, // 👈 Đảm bảo các item luôn căn lề trái
					gap: { xs: '12px 16px', lg: '24px 20px' }, // 👈 Dùng gap thay cho khoảng cách giữa các item
					padding: { xs: '0 8px', sm: '0 20px' },
					maxWidth: { md: '1000px', lg: '1200px' },

				}}>
					{brandList && brandList?.map((brand) => {
						return (
							<Card key={brand?._id}
								onClick={() => {
									navigate(`/brands/${brand?._id}`)
								}}
								sx={{
									minWidth: { xs: 'calc(50% - 8px)', md: 'calc(33.33% - 13.33px)', lg: 'calc(25% - 15px)' },
									maxWidth: { xs: 'calc(50% - 8px)', md: 'calc(33.33% - 13.33px)', lg: 'calc(25% - 15px)' },
									// Bỏ thuộc tính m: { xs: '12px 0', sm: '20px 0', lg: '12px 0' } vì đã có gap
									minHeight: { xs: 'unset', md: 'unset', lg: '180px' },
									maxHeight: { xs: 'unset', md: 'unset', lg: '180px' },
									m: { xs: '12px 0', sm: '20px 0', lg: '12px 0' },
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
										backgroundColor: 'secondary.main',
										p: '12px 20px',
									}
								}} >

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
			{/* <form onSubmit={handleSubmit(handleSubmitForm)}>

				<input
					type="file"
					multiple
					{...register("files")}
				/>
				<button type='submit'>submit</button>
			</form> */}
			<Footer data={info} />
		</Box>
	)
}

export default Brand
