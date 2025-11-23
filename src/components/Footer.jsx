import { Box, Button, Typography } from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"


function Footer({ data }) {
	return <Box >
		<Box sx={{
			backgroundColor: '#fefbf4',
			color: 'text.primary',
			minWidth: '100%',
			maxWidth: '100%',
			display: 'flex',
			maxHeight: '860px',
			minHeight: '860px',
			overflow: 'hidden',
			'& .thumbSlide': {
				minWidth: '50%',
				maxWidth: '50%',
				objectFit: 'cover',
				objectPosition: 'top',
				minHeight: '100%'
			}
		}} >

			<img className="thumbSlide" src={data?.footerThumb} alt="" />

			<Box sx={{
				minWidth: '50%',
				maxWidth: '50%',
				boxSizing: 'border-box'
			}}>
				<Box>
					<Box sx={{
						display: 'grid',
						maxWidth: '60%',
						padding: '40px 80px',
						gridTemplateColumns: 'repeat(2,auto)',
						gap: '0 80px',
						'& a': {
							textDecoration: 'none',
							fontSize: '1em',
							color: 'primary.contrastText',
							position: 'relative',
							mt: '8px'
						}
					}}>
						<Box sx={{ display: 'flex', flexDirection: 'column', width: '200px', mb: '20px' }}>
							<Typography variant="h6" sx={{ fontWeight: 'bold' }}> Đặt hàng & Hỗ trợ</Typography>
							<Link to="/aaa" >Hỏi đáp</Link>
							<Link to="/" >Hướng dẫn mua hàng</Link>
							<Link to="/" >Chính sách bán hàng</Link>
							<Link to="/" >Điều khoản bảo mật</Link>
							<Link to="/" >Điều kiện chung</Link>
						</Box>
						<Box sx={{ display: 'flex', flexDirection: 'column', width: '200px', mb: '20px' }}>
							<Typography variant="h6" sx={{ fontWeight: 'bold' }}> Shop</Typography>
							<Link to="/" >Sản phẩm mới.</Link>
							<Link to="/" >Dành cho mặt.</Link>
							<Link to="/" >Toàn thân</Link>
							<Link to="/" >Sản phẩm vệ sinh.</Link>
						</Box>
						<Box sx={{ display: 'flex', flexDirection: 'column', width: '200px', mb: '20px' }}>
							<Typography variant="h6" sx={{ fontWeight: 'bold' }}> Về Ngô Gia</Typography>
							<Link to="/" >Câu chuyện thương hiệu</Link>
							<Link to="/" >Giá trị cốt lõi</Link>
							<Link to="/" >Trách nhiệm cộng đồng</Link>
						</Box>
						<Box sx={{ display: 'flex', flexDirection: 'column', width: '200px', mb: '20px' }}>
							<Typography variant="h6" sx={{ fontWeight: 'bold' }}> Mạng xã hội</Typography>
							<Link to="/" >Facebook</Link>
							<Link to="/" >Tiktok</Link>
							<Link to="/" >Instagram</Link>
						</Box>
					</Box>
				</Box>
				<Box sx={{
					backgroundColor: 'primary.main',
					minHeight: '100%',
					padding: '40px 80px',
				}}>
					<Box sx={{
						maxWidth: '50%',
						textAlign: 'justify',
						'& .MuiTypography-root.MuiTypography-h5': {
							fontSize: '16px',
							fontWeight: 'bold',
							my: '8px'
						},
						'& .MuiTypography-root.MuiTypography-body1': {
							fontSize: '12px',
							mb: '4px'
						},
					}}>
						<Typography variant="h5">Công ty TNHH MTV Ngô Gia
						</Typography>
						<Typography variant="body1">
							Địa chỉ: 9/12, Sông Hậu, TP Cần Thơ, Việt Nam. Hotline: 02923. 763 345 / 077 9889 800. Email: ngogiacantho@gmail.com
						</Typography>
						<Typography variant="h5">20 năm – một hành trình, nhưng cũng là khởi đầu cho những bước tiến dài hơn, vững vàng hơn trong tương lai.
						</Typography>
						<Typography variant="body1">
							Xin trân trọng cảm ơn và cùng nhau tiếp tục viết tiếp hành trình làm đẹp – làm nên giá trị đích thực cho cuộc sống.
						</Typography>

					</Box>
					<Box sx={{
						'& .bocongthuong': {
							width: '132px',
							my: '16px'
						}
					}}>

						<a href="http://online.gov.vn/Home/" target="_blank">
							<img className="bocongthuong" src="https://res.cloudinary.com/divrizdwo/image/upload/v1758980483/ministry-of-industry-n-trade.199a108_uo6cao.png" alt="" />
						</a>
					</Box>
					<Typography variant="body1">© 2025 Ngo Gia Sac Ngoc. All rights reserved.</Typography>
				</Box>

			</Box>
		</Box>
	</Box>
}

export default Footer
