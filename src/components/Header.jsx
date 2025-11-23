import { Box, Button, MenuItem, TextField } from "@mui/material"
import React, { useState } from "react"
import Badge from '@mui/material/Badge'
import Tooltip from '@mui/material/Tooltip'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Link } from 'react-router-dom'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import { Alert } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import WifiCalling3Icon from '@mui/icons-material/WifiCalling3'
import DialogTitle from '@mui/material/DialogTitle'
import { useForm } from 'react-hook-form'
import { useSelector } from "react-redux"
function Header() {
	const [openContact, setOpenContact] = useState(false)
	const { register, handleSubmit, resetField, setValue, formState: { errors } } = useForm({
		mode: 'onChange',
	})
	const productInCart = useSelector(state => state.cart.items)
	const handleCloseContact = () => {
		setOpenContact(false)
	}
	const handleOpenContact = () => {
		setOpenContact(true)
	}
	const submitSettingSlide = (data) => {

		console.log(' submitSettingSlide: ', data)
	}
	return (
		<Box sx={{
			backgroundColor: '#fefbf4',
			position: 'fixed',
			left: '0',
			height: (theme) => theme.custom.headerHeight,
			mb: '80px',
			right: '0',
			top: '0',
			p: '20px 0',
			zIndex: '99',
			overflow: 'hidden',
			boxShadow: '0px -12px 16px 8px #ccc',
			'& a, #contactBtn': {
				textDecoration: 'none',
				fontSize: '1em',
				color: 'primary.contrastText',
				padding: '8px 12px',
				position: 'relative',
				'&::after': {
					content: '""',
					position: 'absolute',
					bottom: '8px',
					right: '100%',
					left: '8px',
					height: '1px',
					backgroundColor: 'primary.contrastText',
					transition: 'all linear .3s'
				},
				'&:hover::after': {
					right: '8px'
				},

			}
		}}>
			<Box sx={{
				display: 'flex',
				alignItems: 'center',
				maxWidth: '1680px',
				minWidth: '1680px',
				margin: '0 auto'
			}}>
				<Box sx={{
					display: 'flex',
					gap: '4px',
					justifyContent: 'space-between',
					alignItems: 'center',
					maxWidth: '320px',
					minWidth: '320px',
				}}>
					<Link to="/brands" >Nhãn hàng</Link>
					<Link to="/overview" >Ngô Gia</Link>
					<Link to="/product" >Sản Phẩm</Link>
				</Box>
				<Box sx={{
					flex: '1',
					textAlign: 'center',
					'& .logoNgogia': {
						width: '200px'
					}
				}}>
					<Link to="/" >
						<img className="logoNgogia" src="https://res.cloudinary.com/divrizdwo/image/upload/v1761395638/NGSN-Logo_x751zj.png" alt="" />
					</Link>

				</Box>
				<Box sx={{
					maxWidth: '320px',
					minWidth: '320px',
					display: 'flex',
					justifyContent: 'flex-end',
					alignItems: 'center'
				}}>
					<Button id="contactBtn" onClick={handleOpenContact} type="text" sx={{ mr: '40px' }} >Liên hệ</Button>
					<Dialog
						open={openContact}
						onClose={handleCloseContact}
						sx={{ '& .MuiPaper-root': { minWidth: '800px', maxWidth: '800px' } }}
					>
						<DialogTitle sx={{ color: '#000', fontSize: '1.6rem' }}>
							Liên hệ với Ngô gia
							<Tooltip title="Đóng ">
								<CloseIcon onClick={() => setOpenContact(false)} sx={{ position: 'absolute', top: '8px', right: '8px', cursor: 'pointer' }} />
							</Tooltip>
						</DialogTitle>
						<DialogContent>
							<form onSubmit={handleSubmit(submitSettingSlide)}>
								<Box >
									<Box sx={{ padding: '0 20px' }}>

										<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '40px' }}>
											<Box>
												<TextField
													label='Nhập tên của bạn'
													fullWidth
													size='small'
													type="text"
													variant="standard"
													{...register('name', {
														required: 'Vui lòng nhập tên của bạn.',
														minLength: 3,
														maxLength: 50
													})}
													sx={{
														mt: '32px',
														'& .MuiSvgIcon-root': {
															color: 'primary.dark',
															pt: '3px'
														},
														'& .MuiFormLabel-root': {
															right: 'unset !important',
															left: '0',
															fontSize: '16px',
															top: '-2px',
															backgroundColor: '#fff'
														},
														'&  .MuiStandardInput-root ': {
															fontSize: '16px',
															' & .MuiOutlinedInput-notchedOutline': {
																border: '1px solid #ca1a75 !important'
															}
														}
													}}
												/>
												{errors.name && errors?.name?.type !== 'minLength' && errors?.name?.type !== 'maxLength' &&
													<Alert severity="error" sx={{ mt: '8px', py: '0', maxWidth: '100% !important', minWidth: '100% !important', '.MuiAlert-message': { overflow: 'hidden' } }}>
														{errors.name.message}
													</Alert>
												}
												{errors.name?.type == 'minLength' &&
													<Alert severity="error" sx={{ mt: '8px', py: '0', maxWidth: '100% !important', minWidth: '100% !important', '.MuiAlert-message': { overflow: 'hidden' } }}>
														Vui lòng nhập ít nhất 3 ký tự
													</Alert>
												}
												{errors.name?.type == 'maxLength' &&
													<Alert severity="error" sx={{ mt: '8px', py: '0', maxWidth: '100% !important', minWidth: '100% !important', '.MuiAlert-message': { overflow: 'hidden' } }}>
														Vui lòng nhập tối đa 50 ký tự
													</Alert>
												}
											</Box>
											<Box>

												<TextField
													label='Nhập số điện thoại của bạn'
													fullWidth
													size='small'
													type="text"
													variant="standard"
													{...register('phoneNumber', {
														required: 'Vui lòng nhập số điện thoại.',
														minLength: 3,
														maxLength: 50
													})}
													sx={{
														mt: '32px',
														'& .MuiSvgIcon-root': {
															color: 'primary.dark',
															pt: '3px'
														},
														'& .MuiFormLabel-root': {
															right: 'unset !important',
															left: '0',
															fontSize: '16px',
															top: '-2px',
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
												{errors.phoneNumber && errors?.phoneNumber?.type !== 'minLength' && errors?.phoneNumber?.type !== 'maxLength' &&
													<Alert severity="error" sx={{ mt: '8px', py: '0', maxWidth: '100% !important', minWidth: '100% !important', '.MuiAlert-message': { overflow: 'hidden' } }}>
														{errors.phoneNumber.message}
													</Alert>
												}
												{errors.phoneNumber?.type == 'minLength' &&
													<Alert severity="error" sx={{ mt: '8px', py: '0', maxWidth: '100% !important', minWidth: '100% !important', '.MuiAlert-message': { overflow: 'hidden' } }}>
														Vui lòng nhập ít nhất 3 ký tự
													</Alert>
												}
												{errors.phoneNumber?.type == 'maxLength' &&
													<Alert severity="error" sx={{ mt: '8px', py: '0', maxWidth: '100% !important', minWidth: '100% !important', '.MuiAlert-message': { overflow: 'hidden' } }}>
														Vui lòng nhập tối đa 50 ký tự
													</Alert>
												}
											</Box>
										</Box>
										<TextField
											label='Nhập email của bạn'
											fullWidth
											size='small'
											type="text"
											variant="standard"
											{...register('email', {
												required: 'Vui lòng nhập email của bạn',
												minLength: 3,
												maxLength: 50,
												pattern: {
													value: /[^@]{2,64}@[^.]{2,253}\.[0-9a-z-.]{2,63}/g,
													message: 'Vui lòng nhập đúng định dạng email'
												}
											})}
											sx={{
												mt: '32px',
												'& .MuiSvgIcon-root': {
													color: 'primary.dark',
													pt: '3px'
												},
												'& .MuiFormLabel-root': {
													right: 'unset !important',
													left: '0',
													fontSize: '16px',
													top: '-2px',
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
										{errors.email && errors?.email?.type !== 'minLength' && errors?.email?.type !== 'maxLength' &&
											<Alert severity="error" sx={{ mt: '8px', py: '0', maxWidth: '100% !important', minWidth: '100% !important', '.MuiAlert-message': { overflow: 'hidden' } }}>
												{errors.email.message}
											</Alert>
										}
										{errors.email?.type == 'minLength' &&
											<Alert severity="error" sx={{ mt: '8px', py: '0', maxWidth: '100% !important', minWidth: '100% !important', '.MuiAlert-message': { overflow: 'hidden' } }}>
												Vui lòng nhập ít nhất 3 ký tự
											</Alert>
										}
										{errors.supplier?.type == 'maxLength' &&
											<Alert severity="error" sx={{ mt: '8px', py: '0', maxWidth: '100% !important', minWidth: '100% !important', '.MuiAlert-message': { overflow: 'hidden' } }}>
												Vui lòng nhập tối đa 50 ký tự
											</Alert>
										}

										<TextField
											label='Nhập câu hỏi của bạn'
											fullWidth
											multiline
											minRows={3}
											size='small'
											type="text"
											variant="standard"
											{...register('question', {
												required: 'Vui lòng nhập câu hỏi của bạn',
												minLength: 3,
											})}
											sx={{
												mt: '32px',
												'& .MuiSvgIcon-root': {
													color: 'primary.dark',
													pt: '3px'
												},
												'& .MuiFormLabel-root': {
													right: 'unset !important',
													left: '0',
													fontSize: '16px',
													top: '-2px',
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
										{errors.question && errors?.question?.type !== 'minLength' && errors?.question?.type !== 'maxLength' &&
											<Alert severity="error" sx={{ mt: '8px', py: '0', maxWidth: '100% !important', minWidth: '100% !important', '.MuiAlert-message': { overflow: 'hidden' } }}>
												{errors.question.message}
											</Alert>
										}
									</Box>


									<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', pt: '20px' }}>
										<Button
											type="submit"
											variant="contained"
											sx={{
												mt: '20px',
												padding: '20px 40px',

												textTransform: 'uppercase',
												fontSize: '1.2rem',
												backgroundColor: '#000',
												color: '#fff',
												'&:hover': {
													backgroundColor: '#000',
													color: '#fff',
													opacity: 0.9
												}
											}}
										>
											Gửi Ngô Gia
										</Button>
										<Button
											onClick={() => handleCloseContact()}
											variant="outlined"
											startIcon={<WifiCalling3Icon />}
											sx={{
												mt: '20px',
												padding: '20px 40px',
												fontSize: '1.2rem',
												color: '#000',
												textTransform: 'uppercase',
												border: '1px solid #000',
												'&:hover': {
													border: '1px solid #000',
													color: '#000',
													opacity: 0.9
												}
											}}
										>
											Gọi cho Ngô Gia
										</Button>


									</Box>
								</Box>
							</form>
						</DialogContent>

					</Dialog>
					<Tooltip title="Giỏ hàng">
						<Link to='/cart'>
							<Badge badgeContent={productInCart.length ? productInCart.length : undefined} color="primary" sx={{ '& span': { color: '#fff' } }}>
								<ShoppingCartIcon sx={{ color: 'primary.contrastText' }} />
							</Badge>
						</Link>
					</Tooltip>
				</Box>
			</Box>

		</Box>

	)
}

export default Header
