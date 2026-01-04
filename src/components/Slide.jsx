import { Box, Button, Typography } from "@mui/material"
import React from "react"
import EastIcon from '@mui/icons-material/East'

// function Slide({ data }) {
// 	return <Box >
// 		<Box sx={{
// 			backgroundColor: 'rgba(202,26,117, 0.3)',
// 			minWidth: '100%',
// 			maxWidth: '100%',
// 			mb: '80px',
// 			display: 'flex',
// 			mt: (theme) => theme.custom.headerHeight,
// 			'& .thumbSlide': {
// 				maxHeight: (theme) => `calc(100vh - ${theme.custom.headerHeight})`,
// 				minWidth: '50%',
// 				maxWidth: '50%',
// 				objectFit: 'cover',
// 				objectPosition: 'top'
// 			}
// 		}} >

// 			<img className="thumbSlide" src={data?.thumb} alt="" />

// 			<Box sx={{
// 				minWidth: '50%',
// 				maxWidth: '50%',
// 				boxSizing: 'border-box',
// 				padding: '40px 80px'
// 			}}>
// 				<Box sx={{ maxWidth: '80%' }}>
// 					<Typography variant="h3" sx={{ textTransform: 'uppercase', fontSize: '2rem', mb: '20px' }} >{data?.heading}</Typography>
// 					<Typography variant="h2" sx={{ fontFamily: 'Vollkorn', letterSpacing: '2px', lineHeight: '1' }} >{data?.title}</Typography>
// 					<Typography sx={{ fontSize: '1rem !important', mt: '20px', textAlign: 'justify' }} >{data?.content}</Typography>
// 					<Button sx={{
// 						color: '#fff',
// 						padding: '20px 32px',
// 						fontSize: '1.2rem',
// 						textTransform: 'uppercase',
// 						minWidth: '400px',
// 						mt: '40px',
// 						justifyContent: 'space-between',
// 						border: 'none',
// 						backgroundColor: '#000',
// 						'&:hover': {
// 							opacity: '0.8',
// 							backgroundColor: 'tranparent '
// 						},
// 						'& .MuiSvgIcon-root': {
// 							fontSize: '28px !important'
// 						}
// 					}} endIcon={< EastIcon />}> Xem ngay</Button >
// 				</Box>
// 			</Box>
// 		</Box>
// 	</Box >
// }

function Slide({ data }) {
	return <Box sx={{
		height: {
			xs: '464px',
			md: 'auto'     // desktop → ảnh full
		},
		overflow: 'hidden',
	}}>
		<Box
			component="img"
			src={data}
			sx={{
				width: '100%',
				mb: '40px',
				mt: '80px',
				userSelect: 'none',
				objectFit: {
					xs: 'cover',
					md: 'contain'
				},
				objectPosition: '50% 50%',
				height: {
					xs: '100%',
					md: 'auto'
				},
				'&::selection': {
					background: 'transparent'
				}
			}}
		>

		</Box>
	</Box>
}
export default Slide
