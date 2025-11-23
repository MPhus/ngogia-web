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
		height: '600px',
		display: 'flex',
		justifyContent: 'space-between',
		overflow: 'hidden',
		alignItems: 'center',
		padding: '80px'
	}}>
		<Box sx={{ flex: '0 0 50%' }}>
			<Typography variant="h2" sx={{}}>
				Thương hiệu mang tính biểu tượng của chúng tôi
				đang thực hiện một nhiệm vụ
				để làm tốt.
			</Typography>
			<Button
				onClick={() => natigate('/brands')}
				sx={{
					color: '#fff',
					padding: '20px 32px',
					fontSize: '1.2rem',
					textTransform: 'uppercase',
					mt: '40px',
					minWidth: '400px',
					justifyContent: 'space-between',
					border: 'none',
					backgroundColor: '#000',
					'&:hover': {
						opacity: '0.8',
						backgroundColor: 'tranparent '
					},
					'& .MuiSvgIcon-root': {
						fontSize: '28px !important'
					}
				}} endIcon={< EastIcon />}> Khám phá các nhãn hàng của chúng tôi.</Button >
		</Box>
		<Box sx={{ flex: '0 0 50%' }}>
			<Box
				component="img"
				src={data}
				sx={{ height: '100%' }}
			/>

		</Box>
	</Box>
}

export default LinkBrands
