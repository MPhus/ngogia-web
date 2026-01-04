
import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import { Button, Typography } from "@mui/material"
import EastIcon from '@mui/icons-material/East'
import { Link } from 'react-router-dom'
const HotProduct = ({ data }) => {
	const [offset, setOffset] = useState(0)

	useEffect(() => {
		const handleScroll = () => {
			setOffset(window.scrollY * 0.5)
		}
		window.addEventListener("scroll", handleScroll)

		return () => window.removeEventListener("scroll", handleScroll)
	}, [])
	const getTranslate = (speed) => {
		const movement = offset * speed
		return Math.max(-30, Math.min(30, movement))
	}

	return (
		<Box
			sx={{
				position: "relative",
				height: { xs: '800px', sm: "600px" },
				backgroundColor: 'background.default',
				overflow: "hidden",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			{/* Layer 3 - Nền */}
			<Box
				component="img"
				src={data?.thumbHot03}
				alt="Layer 3"
				sx={{
					position: "absolute",
					top: '0',
					left: "50%",
					transform: `translate(-50%, ${offset * 0.1}px)`,
					width: "500px",
					zIndex: 1,
				}}
			/>

			{/* Layer 2 - Trái cây */}
			<Box
				component="img"
				src={data?.thumbHot02}
				alt="Layer 2"
				sx={{
					position: "absolute",
					top: '0',
					left: "50%",
					transform: `translate(-50%, ${offset * -0.1}px)`,
					width: "500px",
					zIndex: 2,
				}}
			/>

			{/* Layer 1 - Chai sản phẩm */}
			<Box
				component="img"
				src={data?.thumbHot01}
				alt="Layer 1"
				sx={{
					position: "absolute",
					top: '0',
					left: "50%",
					transform: `translate(-50%, ${offset * 0.2}px)`,
					width: "500px",
					zIndex: 3,
				}}
			/>
			{/* Text bên trái */}
			<Box
				sx={{
					display: { xs: 'none', sm: 'block' },
					position: "absolute",
					left: '16%',
					top: "0",
					transform: `translateY(${offset * 0.4}px)`,
					zIndex: 4,
					transition: "transform 0.1s linear",
					minWidth: '24%',
					maxWidth: '24%'
				}}
			>
				<Typography variant="h2">
					{data?.title}
				</Typography>
			</Box>

			{/* Text bên phải */}
			<Box
				sx={{
					display: { xs: 'none', sm: 'block' },
					position: "absolute",
					right: { sm: '5%', lg: '16%' },
					top: { sm: '30%' },
					bottom: { sm: 'unset' },
					transform: { sm: `translateY(${offset * -0.4}px)` },
					zIndex: 4,
					transition: "transform 0.1s linear",
					minWidth: { sm: '30%', lg: '20%' },
					maxWidth: { sm: '30%', lg: '20%' },
					color: '#ccc',
					'& .MuiTypography-root.MuiTypography-body1': {
						textAlign: 'justify',
						fontSize: '1.2rem'
					}
				}}
			>
				<Typography variant="body1">
					{data?.description}
				</Typography>

				<Box sx={{
					display: 'flex',
					alignItems: 'center',
					color: '#000',
					gap: '8px',
					padding: '0',
					fontSize: '1rem',
					mt: '20px',
					mb: { xs: '40px', sm: 'unset' },
					'&:hover': {
						backgroundColor: 'none',
					},
					'& a': {
						textDecoration: 'none',
						textTransform: 'uppercase',
						color: '#000',
						fontWeight: '500',
					}
				}} >
					<Link
						to={`/product/${data?._id}`}
					>mua ngay </Link>
					<EastIcon sx={{ fontSize: '1rem' }} />
				</Box>
			</Box>

			<Box
				sx={{
					display: { xs: 'block', sm: 'none' },
					position: 'absolute',
					bottom: '0',
					'& .MuiTypography-root.MuiTypography-body1': {
						textAlign: 'center',
						m: '8px 0',
						padding: { xs: '0 20px', sm: ' 0 80px' },
						color: '#97958f'
					},
					'& .MuiTypography-root.MuiTypography-h2': {
						textAlign: 'center',
						fontSize: '1.6rem',
					},
				}}
			>
				<Typography variant="h2">
					{data?.title}
				</Typography>
				<Typography variant="body1" >
					{data?.description}
				</Typography>
				<Box sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					color: '#000',
					gap: '8px',
					padding: '0',
					fontSize: '1rem',
					my: '40px',
					'&:hover': {
						backgroundColor: 'none',
					},
					'& a': {
						textDecoration: 'none',
						textTransform: 'uppercase',
						color: '#000',
						fontWeight: '500',
					}
				}} >
					<Link
						to={`/product/${data?._id}`}
					>mua ngay </Link>
					<EastIcon sx={{ fontSize: '1rem' }} />
				</Box>
			</Box>
		</Box>
	)
}

export default HotProduct
