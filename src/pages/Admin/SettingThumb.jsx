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


const SettingThumb = memo(({ thumb, updateSlide }) => {

	const { register, handleSubmit, resetField, setValue, formState: { errors } } = useForm({
		mode: 'onChange',
		defaultValues: {
			thumb: thumb
		}
	})

	const [openSettingThumb, setOpenSettingThumb] = useState(false)

	const [imgPreview, setImgPreview] = useState(undefined)
	const inputImgRef = useRef(null)


	useEffect(() => {
		return () => {
			URL.revokeObjectURL(imgPreview)
		}
	}, [imgPreview])

	const handleUploadImg = () => {
		inputImgRef.current.click()
	}
	const handleCloseSettingThumb = () => {
		resetField('thumb')
		setOpenSettingThumb(false)
	}
	const submitSettingThumb = (data) => {
		console.log(' data: ', data)
		const thumb = typeof data['thumb'] !== 'string' ? data['thumb'][0] : ''
		const formData = new FormData()
		formData.append('thumb', thumb)
		updateSlide(formData)
		toast('Đã chỉnh sửa')
		handleCloseSettingThumb()
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
				setOpenSettingThumb(true)
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
				thumb &&
				<Box
					component="img"
					src={thumb}
					sx={{
						position: 'relative',
						width: '100%',
						objectFit: 'cover',
						objectPosition: 'center center',
						filter: 'brightness(64%)'
					}}>
				</Box>
			}

			<Dialog
				open={openSettingThumb}
				onClose={handleCloseSettingThumb}
				sx={{ '& .MuiPaper-root': { minWidth: '1200px', maxWidth: '1200px' } }}
			>
				<DialogTitle >
					Chỉnh sửa nội dung
				</DialogTitle>
				<DialogContent>
					<form onSubmit={handleSubmit(submitSettingThumb)}>
						<Box >
							<Box onClick={handleUploadImg} sx={{
								cursor: 'pointer',
								'& img': {
									minWidth: '100%',
									maxWidth: '100%',
									objectFit: 'cover',
									objectPosition: 'center center',
									filter: 'brightness(64%)'
								}
							}}>

								<Box sx={{ position: 'relative' }}>

									{imgPreview && <img src={imgPreview} />}
									{!imgPreview && <img src={thumb} />}

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

							<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '20px', pt: '20px' }}>
								<Button
									variant="outlined"
									onClick={handleCloseSettingThumb}
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
export default SettingThumb