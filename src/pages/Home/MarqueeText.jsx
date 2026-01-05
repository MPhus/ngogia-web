import { useRef, useEffect, useState } from "react"
import { Box, Typography } from "@mui/material"

export default function InfiniteMarquee({ data }) {
	const [duration, setDuration] = useState(20)

	useEffect(() => {
		const contentWidth = parseInt(data?.length)
		const speed = 3 // px/giây (tốc độ cố định)\
		setDuration(contentWidth / speed)

	}, [data])

	return (
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
					animation: `marquee ${duration}s linear infinite`,
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
						{data}</Typography>
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
	)
}
