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

import EastIcon from '@mui/icons-material/East'
import { toast } from 'react-toastify'


const SettingHomeBrandList = memo(({ homeBrandList, updateHomeBrandList }) => {
	const [brandList, setBrandList] = useState({ ...homeBrandList })
	const { register, handleSubmit, resetField, setValue, formState: { errors } } = useForm({
		mode: 'onChange',
		defaultValues: {
			thumb: brandList.thumb,
			contentWhite: brandList.contentWhite,
			contentGreen: brandList.contentGreen,
			contentBlue: brandList.contentBlue
		}
	})

	const [openSettingHomeBrandList, setOpenSettingHomeBrandList] = useState(false)

	const [imgPreview, setImgPreview] = useState(undefined)
	const inputImgRef = useRef(null)


	useEffect(() => {
		return () => {
			URL.revokeObjectURL(imgPreview)
		}
	}, [imgPreview, brandList.thumb])
	useEffect(() => {
		setValue('contentWhite', brandList.contentWhite)
		setValue('contentGreen', brandList.contentGreen)
		setValue('contentBlue', brandList.contentBlue)
		setValue('thumb', brandList.thumb)
		setImgPreview(undefined)
	}, [openSettingHomeBrandList])
	useEffect(() => {
		return () => {
			setImgPreview(undefined)
			URL.revokeObjectURL(brandList.thumb)
		}
	}, [brandList.thumb])
	const handleUploadImg = () => {
		inputImgRef.current.click()
	}
	const handleCloseSettingHomeBrandList = () => {
		resetField('thumb')
		resetField('contentWhite')
		resetField('contentGreen')
		resetField('contentBlue')
		setOpenSettingHomeBrandList(false)
	}

	const submitSettingHomeBrandList = (data) => {


		const file = typeof data['thumb'] !== 'string' ? data['thumb'][0] : ''

		const formData = new FormData()
		formData.append('thumb', file)
		formData.append('contentWhite', data.contentWhite)
		formData.append('contentGreen', data.contentGreen)
		formData.append('contentBlue', data.contentBlue)

		setBrandList({
			...brandList,
			contentWhite: data.contentWhite,
			contentGreen: data.contentGreen,
			contentBlue: data.contentBlue,
			thumb: typeof data.thumb !== 'string' ? URL.createObjectURL(file) : brandList.thumb
		})

		updateHomeBrandList(formData)
		toast('Đã chỉnh sửa')
		handleCloseSettingHomeBrandList()
		// const imgLink = await uploadImg_API(formData)
	}

	return (
		<Box sx={{ position: 'relative' }}>
			<Box sx={{
				position: 'absolute',
				md: '20px',
				top: '0',
				bottom: '0',
				left: '0',
				right: '0',
				backgroundColor: 'rgba(255,255,255,0.1)',
				width: '100%',
				zIndex: '1',
				display: 'flex', alignItems: 'center', justifyContent: 'center',
				cursor: 'pointer',
				transition: 'all linear .3s',
				'&:hover': {
					backgroundColor: 'rgba(255,255,255,0.3)',
					'& .MuiButtonBase-root': {
						backgroundColor: 'rgba(255, 255, 255, 0.3)',
						'&:hover': {
							color: '#000'

						}

					}
				}
			}} onClick={() => {
				setOpenSettingHomeBrandList(true)
			}} >
				<Button startIcon={<EditIcon />}
					sx={{
						backgroundColor: 'rgba(0,0,0,0.5)',
						padding: '12px 20px',
						fontWeight: '700',
						transition: 'all linear .3s',
					}} >
					Chỉnh sửa
				</Button>
			</Box>
			{
				brandList.thumb &&
				<Box sx={{
					backgroundColor: 'primary.main',
					width: '100%',
					flexDirection: 'row',
					height: '600px',
					display: 'flex',
					justifyContent: 'space-between',
					overflow: 'hidden',
					alignItems: 'center',
					padding: '80px 80px 0 80px'
				}}>
					<Box sx={{
						flex: ' 0 0 50%',
						'& .MuiTypography-root.MuiTypography-h2': {
							fontSize: '2rem',
							fontWeight: 'bold'
						}
					}} >
						<Typography variant="h2" sx={{ color: '#fff' }}>
							{brandList?.contentWhite}
						</Typography>
						<Typography variant="h2" sx={{ color: '#6ddc90' }}>
							{brandList?.contentGreen}
						</Typography>
						<Typography variant="h2" sx={{ color: '#95cbe7' }}>
							{brandList?.contentBlue}
						</Typography>
						<Button
							sx={{
								color: '#a10187',
								padding: { xs: '12px 20px', sm: '20px 32px' },
								fontSize: '0.8rem',
								textTransform: 'uppercase',
								mt: { xs: '20px', sm: '40px' },
								minWidth: { xs: '320px', sm: '400px' },
								justifyContent: 'space-between',
								border: 'none',
								backgroundColor: '#fff',
								'&:hover': {
									backgroundColor: 'primary.dark'
								},
								'& .MuiSvgIcon-root': {
									fontSize: '20px !important'
								}
							}} endIcon={< EastIcon />}> Khám phá các nhãn hàng của chúng tôi.</Button >
					</Box>
					<Box sx={{ flex: '0 0 50%' }}>
						<Box
							component="img"
							src={brandList?.thumb}
							sx={{ width: '100%' }}
						/>

					</Box>
				</Box>
			}

			<Dialog
				open={openSettingHomeBrandList}
				onClose={handleCloseSettingHomeBrandList}
				sx={{ '& .MuiPaper-root': { minWidth: '1200px', maxWidth: '1200px' } }}
			>
				<DialogTitle >
					Chỉnh sửa nội dung
				</DialogTitle>
				<DialogContent>
					<form onSubmit={handleSubmit(submitSettingHomeBrandList)}>
						<Box >
							<Box onClick={handleUploadImg} sx={{
								cursor: 'pointer',
								'& img': {
									minWidth: '100%',
									maxWidth: '100%',
									height: '520px',
									objectFit: 'cover',
									objectPosition: 'center center',
									filter: 'brightness(64%)'
								}
							}}>

								<Box sx={{ position: 'relative' }}>

									{imgPreview && <img src={imgPreview} />}
									{!imgPreview && <img src={brandList.thumb} />}

									<Box sx={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										position: 'absolute',
										top: 0,
										left: 0,
										right: 0,
										bottom: 0,
										backgroundColor: !imgPreview ? 'rgba(255,255,255,0.3)' : 'transparent'
									}}>
										<Button variant='outlined' size='large' startIcon={<DriveFolderUploadIcon />}>Thay hình ảnh</Button>
									</Box>
								</Box>

								<TextField
									fullWidth
									type="file"
									inputRef={inputImgRef}
									variant="outlined"
									sx={{ display: 'none' }}
									{...register('thumb', {
										onChange: (e) => {
											setImgPreview(URL.createObjectURL(e.target.files[0]))
										}
									})}
								/>
							</Box>
							<TextField
								fullWidth
								size='small'
								label="Tiêu đề"
								type="text"
								variant="outlined"
								{...register('contentWhite')}
								sx={{
									mt: '32px',
									'& .MuiSvgIcon-root': {
										color: 'primary.dark',
										pt: '3px'
									},
									'& .MuiFormLabel-root': {
										right: 'unset !important',
										left: '0',
										top: '-4px',
										backgroundColor: '#fff'
									},
									'&  .MuiOutlinedInput-root ': {
										fontSize: '16px',
										' & .MuiOutlinedInput-notchedOutline': {
											border: '1px solid #000 !important'
										}
									}
								}}
							/>
							<TextField
								fullWidth
								size='small'
								label="Tiêu đề"
								type="text"
								variant="outlined"
								{...register('contentGreen')}
								sx={{
									mt: '32px',
									'& .MuiSvgIcon-root': {
										color: 'primary.dark',
										pt: '3px'
									},
									'& .MuiFormLabel-root': {
										right: 'unset !important',
										left: '0',
										top: '-4px',
										backgroundColor: '#fff'
									},
									'&  .MuiOutlinedInput-root ': {
										fontSize: '16px',
										' & .MuiOutlinedInput-notchedOutline': {
											border: '1px solid #000 !important'
										}
									}
								}}
							/>
							<TextField
								fullWidth
								size='small'
								label="Tiêu đề"
								type="text"
								variant="outlined"
								{...register('contentBlue')}
								sx={{
									mt: '32px',
									'& .MuiSvgIcon-root': {
										color: 'primary.dark',
										pt: '3px'
									},
									'& .MuiFormLabel-root': {
										right: 'unset !important',
										left: '0',
										top: '-4px',
										backgroundColor: '#fff'
									},
									'&  .MuiOutlinedInput-root ': {
										fontSize: '16px',
										' & .MuiOutlinedInput-notchedOutline': {
											border: '1px solid #000 !important'
										}
									}
								}}
							/>


							<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '20px', pt: '20px' }}>
								<Button
									variant="outlined"
									onClick={handleCloseSettingHomeBrandList}
									sx={{
										mt: '20px',
										padding: ' 8px 20px',
										fontSize: '16px',
										color: '#000',

										border: '1px solid #000',
										'&:hover': {
											border: '1px solid #000',
											color: '#000',
											opacity: 0.9
										}
									}}
								>
									Hủy
								</Button>
								<Button
									type="submit"
									variant="contained"
									sx={{
										mt: '20px',
										padding: '8px 20px',
										fontSize: '16px',
										backgroundColor: '#000',
										color: '#fff',
										'&:hover': {
											backgroundColor: '#000',
											color: '#fff',
											opacity: 0.9
										}
									}}
								>
									Lưu
								</Button>
							</Box>
						</Box>
					</form >
				</DialogContent>
			</Dialog>
		</Box >
	)
})
export default SettingHomeBrandList