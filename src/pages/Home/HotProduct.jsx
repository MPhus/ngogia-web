
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
				height: "600px",
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
					position: "absolute",
					left: "16%",
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
					position: "absolute",
					right: "16%",
					top: "60%",
					transform: `translateY(${offset * -0.4}px)`,
					zIndex: 4,
					transition: "transform 0.1s linear",
					minWidth: '16%',
					maxWidth: '16%',
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
