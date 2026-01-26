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


const SettingHomeFallText = memo(({ falltext, updateHomeBrandList }) => {
	const { register, handleSubmit, resetField, setValue, formState: { errors } } = useForm({
		mode: 'onChange',
		defaultValues: {
			falltext
		}
	})
	console.log(' falltext: ', falltext)

	const [openSettingFalltext, setOpenSettingFalltext] = useState(false)

	const [imgPreview, setImgPreview] = useState(undefined)
	const inputImgRef = useRef(null)

	useEffect(() => {
		setValue('falltext', falltext)
	}, [openSettingFalltext])

	const handleCloseSettingHomeFallText = () => {
		resetField('falltext')
		setOpenSettingFalltext(false)
	}

	const submitSettingHomeFallText = (data) => {

		formData.append('falltext', data.falltext)


		updateHomeBrandList(formData)
		toast('Đã chỉnh sửa')
		handleCloseSettingHomeFallText()
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
				setOpenSettingFalltext(true)
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
				falltext &&
				<Box
					sx={{
						overflow: "hidden",
						whiteSpace: "nowrap",
						width: "100%",
						bgcolor: "#faf7f2",
					}}
				>
					<Box
						sx={{
							display: "inline-flex",
							animation: `marquee ${20}s linear infinite`,
							padding: '40px 0', borderBottom: '1px  solid #ccc'
						}}
					>
						{/* Lặp nhiều lần để phủ kín màn hình */}
						{Array.from({ length: 4 }).map((_, i) => (
							<Typography
								key={i}
								variant="h3"
								sx={{
									px: 4, fontWeight: "bold", textTransform: 'uppercase',
									color: 'primary.main', fontSize: { xs: '4rem', md: '6rem', xl: '8rem' }
								}}
							>
								{falltext}</Typography>
						))}
					</Box>

					<style>
						{`
          @keyframes marquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
        `}
					</style>
				</Box>
			}

			<Dialog
				open={openSettingFalltext}
				onClose={handleCloseSettingHomeFallText}
				sx={{ '& .MuiPaper-root': { minWidth: '1200px', maxWidth: '1200px' } }}
			>
				<DialogTitle >
					Chỉnh sửa nội dung
				</DialogTitle>
				<DialogContent>
					<form onSubmit={handleSubmit(submitSettingHomeFallText)}>
						<Box >

							<TextField
								fullWidth
								size='small'
								label="Tiêu đề"
								type="text"
								variant="outlined"
								{...register('falltext')}
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
									onClick={handleCloseSettingHomeFallText}
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
export default SettingHomeFallText