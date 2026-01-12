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


const SettingHomeOverview = memo(({ homeOverview, updateHomeOverview }) => {
	const [overview, setOverview] = useState({ ...homeOverview })
	console.log(' overview: ', overview)
	const { register, handleSubmit, resetField, setValue, formState: { errors } } = useForm({
		mode: 'onChange',
		defaultValues: {
			thumb: overview.thumb,
			subcontent: overview.subcontent,
			title: overview.title
		}
	})

	const [openSettingHomeOverview, setOpenSettingHomeOverview] = useState(false)

	const [imgPreview, setImgPreview] = useState(undefined)
	const inputImgRef = useRef(null)


	useEffect(() => {
		return () => {
			URL.revokeObjectURL(imgPreview)
		}
	}, [imgPreview, overview.thumb])
	useEffect(() => {
		setValue('title', overview.title)
		setValue('subcontent', overview.subcontent)
		setValue('thumb', overview.thumb)
		setImgPreview(undefined)
	}, [openSettingHomeOverview])
	useEffect(() => {
		return () => {
			setImgPreview(undefined)
			URL.revokeObjectURL(overview.thumb)
		}
	}, [overview.thumb])
	const handleUploadImg = () => {
		inputImgRef.current.click()
	}
	const handleCloseSettingHomeOverview = () => {
		resetField('thumb')
		resetField('subcontent')
		resetField('title')
		setOpenSettingHomeOverview(false)
	}

	const submitSettingHomeOverview = (data) => {


		const file = typeof data['thumb'] !== 'string' ? data['thumb'][0] : ''

		const formData = new FormData()
		formData.append('thumb', file)
		formData.append('title', data.title)
		formData.append('content', data.content)

		setOverview({
			...overview,
			title: data.title,
			content: data.content,
			thumb: typeof data.thumb !== 'string' ? URL.createObjectURL(file) : overview.thumb
		})

		updateHomeOverview(formData)
		toast('Đã chỉnh sửa')
		handleCloseSettingHomeOverview()
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
				setOpenSettingHomeOverview(true)
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
				overview.thumb &&
				<Box>
					<Box
						component="img"
						src={overview.thumb}
						sx={{
							position: 'relative',
							width: '100%',
							height: '520px',
							objectFit: 'cover',
							objectPosition: 'center center',
							filter: 'brightness(64%)'
						}}>
					</Box>
					<Box sx={{
						minWidth: '40%',
						maxWidth: '40%',
						minHeight: '80%',
						maxHeight: '80%',
						top: '50%',
						position: 'absolute',
						transform: 'translate(-50%, -50%)',
						left: '50%',
						borderRadius: '4px',
						boxShadow: '0px 0px 32px #000',
						p: '32px',
						textAlign: 'center',
						backgroundColor: 'background.default',
						'& .MuiTypography-root.MuiTypography-h2': {
							fontSize: '4rem',
							mb: '20px',
							fontFamily: 'Vollkorn',

						},
						'& .MuiTypography-root.MuiTypography-body1': {
							fontSize: '1.2rem',
							lineHeight: '1.6',
							color: '#97958f'
						},
					}}>
						<Typography variant="h2">{overview?.title}</Typography>
						<Typography variant="body1" sx={{
							maxHeight: '180px',
							textAlign: 'justify',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							WebkitLineClamp: '5',
							display: '-webkit-box',
							WebkitBoxOrient: 'vertical',
							whiteSpace: 'normal'
						}}>
							{overview?.subcontent}
						</Typography>

					</Box>
				</Box>
			}

			<Dialog
				open={openSettingHomeOverview}
				onClose={handleCloseSettingHomeOverview}
				sx={{ '& .MuiPaper-root': { minWidth: '1200px', maxWidth: '1200px' } }}
			>
				<DialogTitle >
					Chỉnh sửa nội dung
				</DialogTitle>
				<DialogContent>
					<form onSubmit={handleSubmit(submitSettingHomeOverview)}>
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
									{!imgPreview && <img src={overview.thumb} />}

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
								{...register('title')}
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
								label="Nội dung"
								type="text"
								multiline
								minRows={5}
								variant="outlined"
								{...register('subcontent')}
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
									onClick={handleCloseSettingHomeOverview}
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
export default SettingHomeOverview