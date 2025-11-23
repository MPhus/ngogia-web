import { useEffect, useState } from 'react'
import Header from "~/components/Header"
import Footer from "~/components/Footer"
import { Box, Typography } from '@mui/material'
import BlogInTheCenter from "~/components/BlogInTheCenter"
import LinkNews from '../Home/LinkNews'
import { useForm } from 'react-hook-form'
import { API_getNewsById, uploadTest } from '~/apis'
import { useParams } from 'react-router-dom'
function Blog_id({ info }) {
	const { id } = useParams()
	const [data, setData] = useState(undefined)
	const count = data?.images.length

	const gridTemplate =
		count === 1 ? "1fr" :
			count === 2 ? "1fr 1fr" :
				count === 3 ? "2fr 1fr" :
					"1fr 1fr"
	useEffect(() => {
		API_getNewsById(id).then(blog => {
			setData(blog)
			setContents(blog?.content?.split('\n'))
		})
			.catch(err => console.log('err:', err))
	}, [id])
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm()
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

	const [windowWidth, setWindowWidth] = useState(window.innerWidth)
	const [isShow, setIsShow] = useState(false)
	const originContent = data?.content?.split('\n')
	const originContentLength = originContent?.length

	const [contents, setContents] = useState()
	const handleShowAllContent = () => {
		setIsShow(false)
		setContents(originContent)
	}

	useEffect(() => {
		if (windowWidth < 1200 && originContentLength > 3) {
			const contentsTemp = contents.filter((t, i) => i <= 2)
			setIsShow(true)
			setContents(contentsTemp)
		} else {
			handleShowAllContent()
		}
	}, [windowWidth])

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
					<Typography variant="h1">{data?.title}</Typography>
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

					<Box
						sx={{
							display: "grid",
							gap: 1.2,
							mt: 2,
							gridTemplateColumns: gridTemplate,
						}}
					>
						{data?.images.map((src, index) => (
							<Box
								key={index}
								component="img"
								src={src}
								alt=""
								sx={{
									width: "100%",
									height:
										count === 1 ? "auto" :
											count === 2 ? 500 :
												count === 3
													? (index === 0 ? 1200 : 500)
													: 500,
									objectFit: "cover",
									borderRadius: "8px",
									gridRow: count === 3 && index === 0 ? "span 2" : "auto",
									cursor: "pointer",
									transition: "0.25s",
									"&:hover": {
										opacity: .9
									}
								}}
							/>
						))}
					</Box>

				</Box >
			</Box>
			{/* <LinkNews inBlogsPage /> */}
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

export default Blog_id
