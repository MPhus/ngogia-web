import { useEffect, useState } from 'react'
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import { Box, Typography } from '@mui/material'
import { API_getNewsById } from '~/apis'
import { useParams } from 'react-router-dom'

// --- GRID ẢNH ---
const GRID_GAP = 10

const getGridTemplateColumns = (count) => {
	if (count === 1) return '1fr'
	if (count === 2) return '1fr 1fr'
	if (count === 3) return '2fr 1fr'
	if (count === 4) return '1fr 1fr'
	if (count === 5) return '3fr 2fr'
	return '1fr 1fr 1fr'
}

function Blog_id({ info }) {
	const { id } = useParams()
	const [data, setData] = useState(null)

	useEffect(() => {
		API_getNewsById(id)
			.then(res => setData(res))
			.catch(err => console.error('Lỗi lấy bài viết:', err))
	}, [id])

	const images = data?.images || []
	const count = images.length
	const gridTemplate = getGridTemplateColumns(count)

	// --- RENDER CONTENT BLOCK ---
	const renderContentBlock = (block, index) => {
		switch (block.type) {
			case 'heading':
				return (
					<Typography
						key={index}
						variant={block.level === 2 ? 'h4' : 'h5'}
						sx={{ fontWeight: 700, mt: 4, mb: 2, fontFamily: 'Vollkorn', }}
					>
						{block.value}
					</Typography>
				)

			case 'paragraph':
				return (
					<Typography
						key={index}
						variant="body1"
						component="p"
						sx={{ mb: 2, textAlign: 'justify', fontFamily: 'Vollkorn', fontSize: '1rem !important' }}
					>
						{block.value}
					</Typography>
				)

			case 'blockquote':
				return (
					<Box
						key={index}
						component="blockquote"
						sx={{
							borderLeft: '4px solid',
							borderColor: 'primary.main',
							pl: 3,
							my: 4,
							fontStyle: 'italic',
							color: 'text.secondary'
						}}
					>
						{block.value}
					</Box>
				)

			case 'image':
				return (
					<Box
						key={index}
						component="img"
						src={block.src}
						alt={block.caption || ''}
						sx={{
							width: '100%',
							borderRadius: '16px',
							my: 4
						}}
					/>
				)

			default:
				return null
		}
	}

	if (!data) return null

	return (
		<Box>
			<Header />

			<Box
				sx={{
					backgroundColor: 'background.default',
					color: 'text.primary',
					mt: '80px',
					fontFamily: 'Vollkorn',
					py: 6
				}}
			>
				<Box
					sx={{
						maxWidth: { xs: '100%', md: '960px', lg: '1200px' },
						mx: 'auto',
						px: { xs: 3, md: 0 }
					}}
				>
					{/* TITLE */}
					<Typography
						variant="h1"
						sx={{
							fontWeight: 800,
							fontSize: { xs: '32px', md: '44px' },
							textAlign: 'center',
							mb: 2
						}}
					>
						{data.title}
					</Typography>

					{/* META */}
					<Box sx={{ textAlign: 'center', mb: 4 }}>
						<Typography variant="body1" color="text.secondary" sx={{ fontSize: '1rem !important' }}>
							{data?.author?.name || 'Admin'} •{' '}
							{new Date(data?.publishedAt).toLocaleDateString('vi-VN')} •{' '}
							{data?.readingTime || 5} phút đọc
						</Typography>
					</Box>

					{/* COVER IMAGE */}
					{data.coverImage && (
						<Box
							component="img"
							src={data.coverImage}
							alt={data.title}
							sx={{
								width: '100%',
								maxHeight: '520px',
								objectFit: 'cover',
								borderRadius: '20px',
								mb: 6
							}}
						/>
					)}

					{/* CONTENT */}
					<Box sx={{ maxWidth: '800px', mx: 'auto', fontFamily: 'Vollkorn', fontSize: '1rem !important' }}>
						{data?.content?.map((block, index) =>
							renderContentBlock(block, index)
						)}
					</Box>

					{/* GRID ẢNH PHỤ */}
					{count > 0 && (
						<Box
							sx={{
								display: 'grid',
								gap: `${GRID_GAP}px`,
								gridTemplateColumns: gridTemplate,
								mt: 6,
								maxWidth: { xs: '100%', md: '1000px' },
								mx: 'auto',
								px: 2
							}}
						>
							{images.map((src, index) => (
								<Box
									key={index}
									component="img"
									src={src}
									alt={`Ảnh ${index + 1}`}
									sx={{
										width: '100%',
										height: '300px',
										objectFit: 'cover',
										borderRadius: '12px'
									}}
								/>
							))}
						</Box>
					)}
				</Box>
			</Box>

			<Footer data={info} />
		</Box>
	)
}

export default Blog_id
