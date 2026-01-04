import { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar'

import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import LogoutIcon from '@mui/icons-material/Logout'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
// import Overview from '~/components/Overview/Overview'
// import Report from '~/components/Report/Report'
// import Statistic from '~/components/Statistic/Statistic'
// import CustomPage from '~/components/CustomPage/CustomPage'
// import CustomDate from '~/untils/'
import authorizedAxiosIntance from '~/untils/authorizedAxios'
import axios from 'axios'
// import UpdateStore from '~/components/UpdateStore/UpdateStore'
// import { UpdateWeb_API, getUserById_API, handleLogoutAPI, updateDetailUser_API } from '~/apis/index'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Tooltip } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-toastify'
import CustomPage from './CustomPage'
// import UpdateUser from '~/components/Statistic/UpdateUser'
function Admin() {
	const navigate = useNavigate()
	const DRAWER_WIDTH = '320px'
	const STATISTICS_LIST = ['Sản phẩm', 'Người dùng', 'Khách hàng', 'Tin Tức']
	const PAGE_LIST = ['Trang chủ', 'Trang Nhãn Hàng', 'Trang Ngô Gia', 'Trang sản phẩm']
	// const year = new CustomDate().getFullYear()
	const [user, setUser] = useState(null)

	const [filterPrice, setFilterPrice] = useState('latest')
	const [openDrawer, setOpenDrawer] = useState(true)
	const [title, setTitle] = useState('Tổng quan')
	const [userDetail, setUserDetail] = useState({})
	const [anchorEl, setAnchorEl] = useState(null)
	const [viewInfo, setViewInfo] = useState(null)

	// useEffect(() => {
	// 	if (user) {
	// 		getUserById_API(user?.id)
	// 			.then(data => {
	// 				setUserDetail(data)
	// 			}
	// 			)
	// 	}
	// }, [user])
	const handleToggleDrawer = () => {
		setOpenDrawer(!openDrawer)
	}
	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	useEffect(() => {
		const testAccess = async () => {
			const res = await authorizedAxiosIntance.get(`http://localhost:3000/v1/users/accesstoken`)

			setUser(res.data)
		}
		testAccess()
		// document.querySelector('link[rel="icon"]').href = 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1722253234/376248141_609292971392775_7616707295223113086_n_lqcbsv.jpg'
	}, [])
	// const updateWeb = async (data) => {
	// 	console.log('data: ', data)
	// 	try {
	// 		await UpdateWeb_API(\ data)
	// 	} catch (error) {
	// 		console.log('error: ', error)

	// 	}
	// }
	// const updateDetailUser = async (data) => {
	// 	console.log('data: ', data)
	// 	const ttestt = await updateDetailUser_API( data)
	// }
	const handleViewInfo = () => {
		setViewInfo(true)
	}
	const handleLogout = () => {
		handleLogoutAPI().then(data => {
			localStorage.removeItem(`userInfo`)
			setUser(null)
			navigate(`/login`)
		})
	}

	const handleChangeNav = (item) => {
		setTitle(item)
	}
	if (!user) {
		return (
			<Box>
				Loading
			</Box>
		)
	}

	return (
		<Box sx={{ backgroundColor: '#f8f8f8' }}>
			<Box sx={{ display: 'flex' }}>
				<Box sx={{ ml: openDrawer ? DRAWER_WIDTH : '0', mr: `-${DRAWER_WIDTH}`, flexGrow: '1', width: '100%' }} >
					<AppBar position="static">
						<Toolbar>
							{!openDrawer &&
								<IconButton
									size="large"
									edge="start"
									color="inherit"
									sx={{ mr: 2 }}
									onClick={handleToggleDrawer}
								>
									<MenuIcon />
								</IconButton>
							}

							<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
								{title === 'Tổng quan' && 'Tổng quan'}
								{STATISTICS_LIST.includes(title) && `Thống kê: ${title}`}
								{PAGE_LIST.includes(title) && `Chỉnh sửa: ${title}`}
							</Typography>

							<div>
								<Button
									variant='outlined'
									sx={{ color: '#000', textTransform: 'unset' }}
									onClick={handleMenu}>
									<Typography variant="h6" >{user?.email}</Typography>
									<Avatar
										sx={{ bgcolor: 'sencondary.main', ml: '12px' }}
									/>
								</Button>
								<Menu
									id="menu-appbar"
									anchorEl={anchorEl}
									anchorOrigin={{
										vertical: 'bottom',
										horizontal: 'left'
									}}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'left'
									}}
									open={Boolean(anchorEl)}
									onClose={handleClose}

								>
									<MenuItem onClick={handleViewInfo} >Thông tin tài khoản</MenuItem>
									<MenuItem onClick={handleLogout} sx={{ color: 'error.main', textAlign: 'center' }}>Đăng xuất <LogoutIcon sx={{ ml: '8px' }} /></MenuItem>
								</Menu>
							</div>
							<Dialog
								open={!!viewInfo}
								onClose={() => setViewInfo(false)}
								sx={{ '& .MuiPaper-root': { minWidth: '800px', maxWidth: '800px' } }}
							>
								<DialogTitle id="alert-dialog-title">
									Cập nhật thông tin cá nhân
									<Tooltip title="Đóng ">
										<CloseIcon onClick={() => setViewInfo(false)} sx={{ position: 'absolute', top: '8px', right: '8px', cursor: 'pointer' }} />
									</Tooltip>
								</DialogTitle>
								<DialogContent>
									{/* <UpdateUser userDetail={userDetail} closeTest={() => setViewInfo(false)} updateDetailUser={updateDetailUser} /> */}
								</DialogContent>
							</Dialog>
						</Toolbar>
					</AppBar>
				</Box>

				<Drawer
					sx={{
						width: DRAWER_WIDTH,
						flexShrink: 0,
						'& .MuiDrawer-paper': {
							width: DRAWER_WIDTH,
							boxSizing: 'border-box',

							backgroundColor: 'secondary.main',
							color: 'primary.main'
						}
					}}
					variant="persistent"
					anchor="left"
					open={openDrawer}
				>
					<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 8px 15px 20px' }}>
						<Typography variant='h5'>Admin</Typography>
						<IconButton onClick={handleToggleDrawer}
							sx={{
								border: '1px solid ',
								padding: '4px',
								color: 'primary.main'
							}}>
							<ChevronLeftIcon sx={{
								transform: 'scale(1.2)'
							}} />
						</IconButton>
					</Box>
					<Divider />
					<List>
						<ListItem disablePadding onClick={() => handleChangeNav('Tổng quan')} sx={{ backgroundColor: 'Tổng quan' === title ? '#49664c' : 'transparent' }}>
							<ListItemButton>
								<ListItemText primary={'Tổng quan'} />
							</ListItemButton>
						</ListItem>

					</List>

					<Divider textAlign="center"><Chip label="Thống kê" size="small" sx={{ color: '#fff', textTransform: 'uppercase', padding: '12px 0', fontWeight: 'bold' }} /></Divider>

					<List>
						{STATISTICS_LIST.map((item, index) => {
							return (
								<ListItem key={index} disablePadding onClick={() => handleChangeNav(item)} sx={{ backgroundColor: item === title ? '#49664c' : 'transparent' }}>
									<ListItemButton>
										<ListItemText primary={item} />
									</ListItemButton>
								</ListItem>
							)
						})}
					</List>

					<Divider textAlign="center"><Chip label="Chỉnh sửa trang Web" size="small" sx={{ color: '#fff', textTransform: 'uppercase', padding: '12px 0', fontWeight: 'bold' }} /></Divider>

					<List>
						{PAGE_LIST.map((item, index) => {
							return (
								<ListItem key={index} disablePadding onClick={() => handleChangeNav(item)} sx={{ backgroundColor: item === title ? '#49664c' : 'transparent' }}>
									<ListItemButton>
										<ListItemText primary={item} />
									</ListItemButton>
								</ListItem>
							)
						})}
					</List>
					<Divider textAlign="center"><Chip label="Chỉnh sửa cửa hàng" size="small" sx={{ color: '#fff', textTransform: 'uppercase', padding: '12px 0', fontWeight: 'bold' }} /></Divider>

					<List>
						<ListItem disablePadding onClick={() => handleChangeNav('Chỉnh sửa thông tin cửa hàng')} sx={{ backgroundColor: 'Chỉnh sửa thông tin cửa hàng' === title ? '#49664c' : 'transparent' }}>
							<ListItemButton>
								<ListItemText primary={'Chỉnh sửa thông tin cửa hàng'} />
							</ListItemButton>
						</ListItem>
					</List>
				</Drawer>
			</Box>


			<Box sx={{
				ml: openDrawer ? DRAWER_WIDTH : '0', mr: `-${DRAWER_WIDTH}`, width: openDrawer ? `calc(100% - ${DRAWER_WIDTH})` : '100%'
			}}>



				{STATISTICS_LIST.includes(title) &&
					<Box >
						<Statistic />
					</Box>
				}

				{PAGE_LIST.includes(title) &&
					<Box>
						<CustomPage type={title} />
					</Box>
				}
				{title === 'Chỉnh sửa thông tin cửa hàng' &&
					<UpdateStore />
				}

			</Box>
		</Box >
	)
}

export default Admin
