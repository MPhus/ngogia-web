import { Box, Typography } from "@mui/material"
import React from "react"

import Button from "@mui/material/Button"
import EastIcon from '@mui/icons-material/East'
import { useNavigate } from "react-router-dom"

function LinkBrands({ data }) {
	const natigate = useNavigate()
	return <Box sx={{
		backgroundColor: 'primary.main',
		width: '100%',
		flexDirection: { xs: 'column', xl: 'row' },
		height: {
			xs: '800px', sm: '1200px', xl: '600px'
		},
		display: 'flex',
		justifyContent: { xs: 'space-between', xl: 'space-between' },
		gap: { xs: '20px', xl: 'unset' },
		overflow: 'hidden',
		alignItems: { xs: 'unset', xl: 'center' },
		padding: { xs: '32px 32px 0 32px', sm: '80px 80px 0 80px' }
	}}>
		<Box sx={{
			flex: { xs: 'unset', xl: ' 0 0 50%' },
			'& .MuiTypography-root.MuiTypography-h2': {
				fontSize: { xs: '2rem', sm: '3rem' },
				fontWeight: 'bold'
			}
		}} >
			<Typography variant="h2" sx={{ color: '#fff' }}>
				Mỗi thương hiệu NGÔ GIA là một hành trình
			</Typography>
			<Typography variant="h2" sx={{ color: '#6ddc90' }}>
				Thấu hiểu làn da - Lan tỏa vẻ đẹp VIỆT
			</Typography>
			<Typography variant="h2" sx={{ color: '#95cbe7' }}>
				tự nhiên,	khỏe mạnh theo cách riêng của người VIỆT.
			</Typography>
			<Button
				onClick={() => natigate('/brands')}
				sx={{
					color: '#a10187',
					padding: { xs: '12px 20px', sm: '20px 32px' },
					fontSize: { xs: '0.8rem', sm: '1.2rem' },
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
						fontSize: { xs: '20px !important', sm: '28px !important' }
					}
				}} endIcon={< EastIcon />}> Khám phá các nhãn hàng của chúng tôi.</Button >
		</Box>
		<Box sx={{ flex: { xs: 'unset', xl: '0 0 50%' }, m: { xs: '0 -80px', xl: 'unset' } }}>
			<Box
				component="img"
				src={data}
				sx={{ height: { xs: 'auto', xl: '100%' }, width: '100%' }}
			/>

		</Box>
	</Box>
}

export default LinkBrands
