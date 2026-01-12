import { Box, Button, Drawer, MenuItem, MenuList, TextField } from "@mui/material"
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
import MenuIcon from '@mui/icons-material/Menu'
import { useSelector } from "react-redux"
function Header() {
	const [openContact, setOpenContact] = useState(false)
	const [openMenu, setOpenMenu] = useState(false)
	const toggleMenu = (newOpen) => () => {
		setOpenMenu(newOpen)
	}
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
			p: { xs: '20px 12px', md: '20px 40px' },
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
				margin: '0 auto'
			}}>
				<Box sx={{
					display: { xs: 'block', md: 'none' },
					cursor: 'pointer'
				}}
					onClick={() => { setOpenMenu(true) }}>
					<Tooltip title="Xem thêm">
						<MenuIcon />
					</Tooltip>
				</Box>
				<Box sx={{
					display: { xs: 'none', md: 'flex' },
					gap: '4px',
					justifyContent: 'space-between',
					alignItems: 'center',
					maxWidth: '320px',
					minWidth: '320px',
				}}>
					<Link to="/brands" >Nhãn hàng</Link>
					<Link to="/overview" >NGÔ GIA</Link>
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

				<Box sx={{ display: { xs: 'block', md: 'none' }, cursor: 'pointer' }}>
					<Tooltip title="Giỏ hàng">
						<Link to='/cart'>
							<Badge badgeContent={productInCart.length ? productInCart.length : undefined} color="primary" sx={{ '& span': { color: '#fff' } }}>
								<ShoppingCartIcon sx={{ color: 'primary.contrastText' }} />
							</Badge>
						</Link>
					</Tooltip>
				</Box>

				<Box sx={{
					maxWidth: { md: 'unset', lg: '320px' },
					minWidth: { md: 'unset', lg: '320px' },
					display: { xs: 'none', md: 'flex' },
					justifyContent: 'flex-end',
					alignItems: 'center'
				}}>
					<Button id="contactBtn" onClick={handleOpenContact} type="text" sx={{ mr: '40px' }} >Liên hệ</Button>
					<Dialog
						open={openContact}
						onClose={handleCloseContact}
						sx={{
							'& .MuiPaper-root':
							{
								minWidth: { xs: '80%', md: '800px' },
								maxWidth: { xs: '80%', md: '800px' }
							}
						}}
					>
						<DialogTitle sx={{ color: '#000', fontSize: '1.6rem' }}>
							Liên hệ với NGÔ GIA
							<Tooltip title="Đóng ">
								<CloseIcon onClick={() => setOpenContact(false)} sx={{ position: 'absolute', top: '8px', right: '8px', cursor: 'pointer' }} />
							</Tooltip>
						</DialogTitle>
						<DialogContent>
							<form onSubmit={handleSubmit(submitSettingSlide)}>
								<Box >
									<Box sx={{ padding: { xs: '0 8px', md: '0 20px' } }}>
										<Box sx={{
											display: 'flex',
											flexDirection: { xs: 'column', md: 'row' },
											justifyContent: { xs: 'flex-start', md: 'space-between' },
											alignItems: { xs: 'unset', md: 'center' },
											gap: { xs: '0', md: '40px' }
										}}>
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
														mt: { xs: '12px', md: '32px' },
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
														mt: { xs: '12px', md: '32px' },
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
												mt: { xs: '12px', md: '32px' },
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
												mt: { xs: '12px', md: '32px' },
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


									<Box sx={{
										display: 'flex',
										flexDirection: { xs: 'column', md: 'row' },
										alignItems: 'center',
										justifyContent: 'center',
										gap: { xs: '8px', md: '20px' },
										pt: '20px'
									}}>
										<Button
											type="submit"
											variant="contained"
											sx={{
												width: { xs: '100%', md: 'unset' },
												mt: { xs: '12px', md: '32px' },
												padding: '20px 40px',
												textTransform: 'uppercase',
												fontSize: { xs: '1rem', md: '1.2rem' },
												backgroundColor: '#000',
												color: '#fff',
												'&:hover': {
													backgroundColor: '#000',
													color: '#fff',
													opacity: 0.9
												}
											}}
										>
											Gửi NGÔ GIA
										</Button>
										<Button
											onClick={() => handleCloseContact()}
											variant="outlined"
											startIcon={<WifiCalling3Icon />}
											sx={{
												width: { xs: '100%', md: 'unset' },
												mt: { xs: '12px', md: '32px' },
												padding: '20px 40px',
												fontSize: { xs: '1rem', md: '1.2rem' },
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
											Gọi cho NGÔ GIA
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
			<Drawer
				open={openMenu}
				onClose={toggleMenu(false)}
				sx={{
					'& .MuiPaper-root': {
						width: {
							xs: '100%',
							md: '420px'
						},
						backgroundColor: '#fff',
						px: 2
					}
				}}
			>
				<MenuList
					sx={{
						height: '100%',
						display: 'flex',
						flexDirection: 'column',
						gap: '28px',
						pt: 2,

						'& .MuiMenuItem-root': {
							px: 2,
							py: 1.5,
							borderRadius: '12px',
							transition: 'all 0.25s ease',
							position: 'relative',

							'&:hover': {
								backgroundColor: 'rgba(233, 30, 99, 0.08)',
								pl: 3,

								'&::before': {
									opacity: 1
								}
							},

							'&::before': {
								content: '""',
								position: 'absolute',
								left: 0,
								top: '50%',
								transform: 'translateY(-50%)',
								width: '4px',
								height: '60%',
								backgroundColor: 'primary.main',
								borderRadius: '4px',
								opacity: 0,
								transition: '0.25s'
							}
						},

						'& .MuiMenuItem-root a, .MuiMenuItem-root button': {
							width: '100%',
							textDecoration: 'none',
							color: 'primary.main',
							fontSize: '20px',
							fontWeight: 600,
							letterSpacing: '1.5px',
							textTransform: 'uppercase'
						}
					}}
				>
					{/* Close button */}
					<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
						<Button
							onClick={toggleMenu(false)}
							sx={{
								minWidth: '40px',
								height: '40px',
								borderRadius: '50%',
								color: 'primary.main',
								'&:hover': {
									backgroundColor: 'rgba(233, 30, 99, 0.1)'
								}
							}}
						>
							<CloseIcon sx={{ fontSize: 28 }} />
						</Button>
					</Box>

					{/* Logo */}
					<Box
						sx={{
							textAlign: 'center',
							'& img': {
								width: '180px',
								transition: '0.3s',
								'&:hover': {
									transform: 'scale(1.05)'
								}
							}
						}}
					>
						<Link to="/">
							<img
								src="https://res.cloudinary.com/divrizdwo/image/upload/v1761395638/NGSN-Logo_x751zj.png"
								alt="Ngô Gia"
							/>
						</Link>
					</Box>

					{/* Menu items */}
					<MenuItem>
						<Link to="/overview">Về chúng tôi</Link>
					</MenuItem>

					<MenuItem>
						<Link to="/product">Sản phẩm</Link>
					</MenuItem>

					<MenuItem>
						<Link to="/brands">Nhãn hàng</Link>
					</MenuItem>

					<MenuItem>
						<Button size="small" onClick={handleOpenContact} type="text" sx={{ justifyContent: 'flex-start' }} >Liên hệ</Button>
					</MenuItem>

					{/* Spacer */}
					<Box sx={{ flexGrow: 1 }} />

					{/* Footer (optional) */}
					<Box
						sx={{
							textAlign: 'center',
							fontSize: '14px',
							color: 'text.secondary',
							pb: 2
						}}
					>
						© NGÔ GIA since 2009
					</Box>
				</MenuList>
			</Drawer>

		</Box>

	)
}

export default Header
