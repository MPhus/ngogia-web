import { memo, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import EditIcon from '@mui/icons-material/Edit'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload'

import { toast } from 'react-toastify'
import SettingThumb from '../SettingThumb'
import SettingHomeOverview from './SettingHomeOverview'
import SettingHomeBrandList from './SettingHomeBrandList'
import SettingHomeFallText from './SettingHomeFallText'


const SettingHomePage = memo(({ homePage }) => {
	console.log(' homePage: ', homePage)

	// const { register, handleSubmit, resetField, setValue, formState: { errors } } = useForm({
	// 	mode: 'onChange',
	// 	defaultValues: {
	// 		slide: homePage.slide,
	// 		fallText: homePage.fallText,
	// 		bgOverview: homePage.bgOverview,
	// 		bgReviewBrand: homePage.bgReviewBrand,
	// 	}
	// })

	// const [openSettingSlide, setOpenSettingSlide] = useState(false)

	// const [imgPreview, setImgPreview] = useState(undefined)
	// const inputImgRef = useRef(null)

	// const handleCloseSettingSlide = () => {
	// 	resetField('slide')
	// 	resetField('fallText')
	// 	resetField('bgOverview')
	// 	resetField('bgReviewBrand')
	// 	setOpenSettingSlide(false)
	// }

	// useEffect(() => {
	// 	return () => {
	// 		URL.revokeObjectURL(imgPreview)
	// 	}
	// }, [imgPreview, homePage.thumb])
	// useEffect(() => {
	// 	setValue('slide', homePage.slide)
	// 	setValue('fallText', homePage.fallText)
	// 	setValue('bgOverview', homePage.bgOverview)
	// 	setValue('bgReviewBrand', homePage.bgReviewBrand)
	// 	setImgPreview(undefined)
	// }, [openSettingSlide])

	// useEffect(() => {
	// 	return () => {
	// 		setImgPreview(undefined)
	// 		URL.revokeObjectURL(homePage.thumb)
	// 	}
	// }, [homePage.thumb])

	// const handleUploadImg = () => {
	// 	inputImgRef.current.click()
	// }

	// const submitSettingSlide = (data) => {
	// 	const slide = typeof data['slide'] !== 'string' ? data['slide'][0] : ''
	// 	const bgOverview = typeof data['bgOverview'] !== 'string' ? data['bgOverview'][0] : ''
	// 	const bgReviewBrand = typeof data['bgReviewBrand'] !== 'string' ? data['bgReviewBrand'][0] : ''
	// 	const formData = new FormData()
	// 	formData.append('slide', slide)
	// 	formData.append('fallText', data.fallText)
	// 	formData.append('bgOverview', bgOverview)
	// 	formData.append('bgReviewBrand', bgReviewBrand)
	// 	formData.append('_id', homePage._id)
	// 	updateSlide(formData)
	// 	setSlide({
	// 		...homePage,
	// 		fallText: data.fallText,
	// 		slide: typeof data.slide !== 'string' ? URL.createObjectURL(slide) : homePage.slide,
	// 		bgReviewBrand: typeof data.bgReviewBrand !== 'string' ? URL.createObjectURL(bgOverview) : homePage.bgReviewBrand,
	// 		bgOverview: typeof data.bgOverview !== 'string' ? URL.createObjectURL(bgReviewBrand) : homePage.bgOverview,
	// 	})
	// 	toast('Đã chỉnh sửa')
	// 	handleCloseSettingSlide()
	// 	// const imgLink = await uploadImg_API(formData)
	// }
	const test = (a) => {
		console.log('test:', a)
	}
	return (
		// <Box sx={{ position: 'relative' }}>
		// 	<Box sx={{
		// 		position: 'absolute',
		// 		md: '20px',
		// 		top: '0', bottom: '0', left: '0', right: '0',
		// 		backgroundColor: 'rgba(255,255,255,0.1)',
		// 		width: '100%',
		// 		zIndex: '1',
		// 		display: 'flex', alignItems: 'center', justifyContent: 'center',
		// 		cursor: 'pointer',
		// 		transition: 'all linear .3s',
		// 		'&:hover': {
		// 			backgroundColor: 'rgba(255,255,255,0.3)',
		// 			'& .MuiButtonBase-root': {
		// 				backgroundColor: 'rgba(255, 255, 255, 0.3)',
		// 				'&:hover': {
		// 					color: '#000'

		// 				}

		// 			}
		// 		}
		// 	}} onClick={() => {
		// 		setOpenSettingSlide(true)
		// 	}} >
		// 		<Button startIcon={<EditIcon />} sx={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: '12px 20px', fontWeight: '700', transition: 'all linear .3s', }} >
		// 			Chỉnh sửa
		// 		</Button>
		// 	</Box>
		// 	{
		// 		homePage &&
		// 		<Box>
		// 			<Box sx={{
		// 				position: 'relative',
		// 				width: '100%',
		// 				height: '444px',
		// 				'& img': {
		// 					position: 'absolute',
		// 					top: 0,
		// 					minWidth: '100%',
		// 					maxWidth: '100%',
		// 					minHeight: '100%',
		// 					maxHeight: '100%',
		// 					objectFit: 'cover',
		// 					objectPosition: 'center center',
		// 					filter: 'brightness(64%)'
		// 				}

		// 			}}>
		// 				<img src={homePage.slide} alt="" />
		// 				<Box sx={{
		// 					position: 'absolute',
		// 					top: '24%',
		// 					right: '10%',
		// 					transform: 'none',
		// 					minWidth: '320px',
		// 					maxWidth: '360px',
		// 					textAlign: 'center'
		// 				}}>
		// 					<Box sx={{
		// 						'& .MuiTypography-root': {
		// 							color: 'primary.main',
		// 							fontFamily: 'fontFamily',
		// 							letterSpacing: '2px',
		// 							m: '0 0 20px 0'
		// 						},
		// 						'& .MuiTypography-root.MuiTypography-body1': {
		// 							fontSize: '14px'
		// 						}

		// 					}}>

		// 					</Box>
		// 				</Box>
		// 			</Box>
		// 		</Box>

		// 	}

		// 	<Dialog
		// 		open={openSettingSlide}
		// 		onClose={handleCloseSettingSlide}
		// 		sx={{ '& .MuiPaper-root': { minWidth: '1200px', maxWidth: '1200px' } }}
		// 	>
		// 		<DialogTitle >
		// 			Chỉnh sửa nội dung
		// 		</DialogTitle>
		// 		<DialogContent>
		// 			<form onSubmit={handleSubmit(submitSettingSlide)}>
		// 				<Box >
		// 					<Box onClick={handleUploadImg} sx={{
		// 						cursor: 'pointer',
		// 						'& img': {
		// 							minWidth: '100%',
		// 							maxWidth: '100%',
		// 							minHeight: '400px',
		// 							maxHeight: '400px',
		// 							objectFit: 'cover',
		// 							objectPosition: 'center center',
		// 							filter: 'brightness(64%)'
		// 						}
		// 					}}>

		// 						<Box sx={{ position: 'relative' }}>

		// 							{imgPreview && <img src={imgPreview} />}
		// 							{!imgPreview && <img src={homePage.slide} />}

		// 							<Box sx={{
		// 								display: 'flex',
		// 								alignItems: 'center',
		// 								justifyContent: 'center',
		// 								position: 'absolute',
		// 								top: 0,
		// 								left: 0,
		// 								right: 0,
		// 								bottom: 0,
		// 								backgroundColor: !imgPreview ? 'rgba(255,255,255,0.3)' : 'transparent'
		// 							}}>
		// 								<Button variant='outlined' size='large' startIcon={<DriveFolderUploadIcon />}>Thay hình ảnh</Button>
		// 							</Box>
		// 						</Box>

		// 						<TextField
		// 							fullWidth
		// 							type="file"
		// 							inputRef={inputImgRef}
		// 							variant="outlined"
		// 							sx={{ display: 'none' }}
		// 							{...register('thumb', {
		// 								onChange: (e) => {
		// 									setImgPreview(URL.createObjectURL(e.target.files[0]))
		// 								}
		// 							})}
		// 						/>
		// 					</Box>

		// 					<TextField
		// 						fullWidth
		// 						size='small'
		// 						// label={!ortherPage ? 'Địa chỉ' : 'Tiêu đề'}
		// 						type="text"
		// 						variant="outlined"
		// 						{...register('title')}
		// 						sx={{
		// 							mt: '32px',
		// 							'& .MuiSvgIcon-root': {
		// 								color: 'primary.dark',
		// 								pt: '3px'
		// 							},
		// 							'& .MuiFormLabel-root': {
		// 								right: 'unset !important',
		// 								left: '0',
		// 								top: '-4px',
		// 								backgroundColor: '#fff'
		// 							},
		// 							'&  .MuiOutlinedInput-root ': {
		// 								fontSize: '16px',
		// 								' & .MuiOutlinedInput-notchedOutline': {
		// 									border: '1px solid #000 !important'
		// 								}
		// 							}
		// 						}}
		// 					/>
		// 					{/* {!ortherPage && <TextField
		// 						fullWidth
		// 						size='small'
		// 						label="Tiều đề"
		// 						type="text"
		// 						multiline
		// 						minRows={2}
		// 						variant="outlined"
		// 						{...register('heading')}
		// 						sx={{
		// 							mt: '32px',
		// 							'& .MuiSvgIcon-root': {
		// 								color: 'primary.dark',
		// 								pt: '3px'
		// 							},
		// 							'& .MuiFormLabel-root': {
		// 								right: 'unset !important',
		// 								left: '0',
		// 								top: '-4px',
		// 								backgroundColor: '#fff'
		// 							},
		// 							'&  .MuiOutlinedInput-root ': {
		// 								fontSize: '16px',
		// 								' & .MuiOutlinedInput-notchedOutline': {
		// 									border: '1px solid #000 !important'
		// 								}
		// 							}
		// 						}}
		// 					/>} */}

		// 					<TextField
		// 						fullWidth
		// 						size='small'
		// 						label="Nội dung"
		// 						type="text"

		// 						multiline
		// 						minRows={2}
		// 						variant="outlined"
		// 						{...register('content')}
		// 						sx={{
		// 							mt: '32px',
		// 							'& .MuiSvgIcon-root': {
		// 								color: 'primary.dark',
		// 								pt: '3px'
		// 							},
		// 							'& .MuiFormLabel-root': {
		// 								right: 'unset !important',
		// 								left: '0',
		// 								top: '-4px',
		// 								backgroundColor: '#fff'
		// 							},
		// 							'&  .MuiOutlinedInput-root ': {
		// 								fontSize: '16px',
		// 								' & .MuiOutlinedInput-notchedOutline': {
		// 									border: '1px solid #000 !important'
		// 								}
		// 							}
		// 						}}
		// 					/>
		// 					<TextField
		// 						fullWidth
		// 						size='small'
		// 						label="Mô tả"
		// 						type="text"
		// 						variant="outlined"
		// 						{...register('description')}
		// 						sx={{
		// 							mt: '32px',
		// 							'& .MuiSvgIcon-root': {
		// 								color: 'primary.dark',
		// 								pt: '3px'
		// 							},
		// 							'& .MuiFormLabel-root': {
		// 								right: 'unset !important',
		// 								left: '0',
		// 								top: '-4px',
		// 								backgroundColor: '#fff'
		// 							},
		// 							'&  .MuiOutlinedInput-root ': {
		// 								fontSize: '16px',
		// 								' & .MuiOutlinedInput-notchedOutline': {
		// 									border: '1px solid #000 !important'
		// 								}
		// 							}
		// 						}}
		// 					/>

		// 					<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '20px', pt: '20px' }}>
		// 						<Button
		// 							variant="outlined"
		// 							onClick={handleCloseSettingSlide}
		// 							sx={{
		// 								mt: '20px',
		// 								padding: ' 8px 20px',
		// 								fontSize: '16px',
		// 								color: '#000',

		// 								border: '1px solid #000',
		// 								'&:hover': {
		// 									border: '1px solid #000',
		// 									color: '#000',
		// 									opacity: 0.9
		// 								}
		// 							}}
		// 						>
		// 							Hủy
		// 						</Button>
		// 						<Button
		// 							type="submit"
		// 							variant="contained"
		// 							sx={{
		// 								mt: '20px',
		// 								padding: '8px 20px',
		// 								fontSize: '16px',
		// 								backgroundColor: '#000',
		// 								color: '#fff',
		// 								'&:hover': {
		// 									backgroundColor: '#000',
		// 									color: '#fff',
		// 									opacity: 0.9
		// 								}
		// 							}}
		// 						>
		// 							Lưu
		// 						</Button>
		// 					</Box>

		// 				</Box>
		// 			</form >
		// 		</DialogContent>
		// 	</Dialog>
		// </Box >
		<Box>
			{homePage && <SettingThumb thumb={homePage.slide} updateSlide={test} />}
			{/* {homePage && <SettingHotProduct thumb={homePage.slide} updateSlide={test} />} */}
			<Box>Hot product</Box>
			{homePage && <SettingHomeOverview homeOverview={{ thumb: homePage.bgOverview, subcontent: homePage.overview.subcontent, title: homePage.overview.title }} />}
			{homePage && <SettingHomeFallText falltext={homePage.fallText} />}
			{homePage && <SettingHomeBrandList homeBrandList={homePage.reviewBrand} />}

		</Box>
	)
})
export default SettingHomePage