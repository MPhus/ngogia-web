// BlogInTheLeft.jsx
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useContentTruncation from './useContentTruncation' // Import hook mới

function BlogInTheLeft({ data, darkTheme, setting }) {
	// Thay thế logic state cũ bằng Custom Hook
	const { contents, isShowMoreButton, handleShowAllContent } = useContentTruncation(data.content)

	return (
		<Box sx={{
			maxWidth: '100%',
			margin: '0 auto',
			display: 'flex',
			flexDirection: {
				xs: 'column-reverse',
				lg: 'row'
			},
			alignItems: 'center',
			padding: '40px 20px',
			backgroundColor: darkTheme ? 'primary.dark' : 'background.default',
			color: darkTheme ? 'primary.main' : 'text.primary',
			gap: '40px'
		}}>


			<Box sx={{
				flex: {
					xs: '1 1 100%',
					lg: '0 0 50%'
				},

			}}>
				<img src={data.thumb}
					alt={data.title}
					style={{
						width: '100%',
						height: 'auto',
						display: 'block'
					}}
				/>
			</Box>

			<Box sx={{
				p: {
					xs: '0 12px',
					md: '0 20px',
					lg: '0 40px'
				},
				textAlign: {
					xs: 'center',
					lg: 'left'
				},
				fontFamily: "Arial",
				flex: {
					xs: '1 1 100%',
					lg: '0 0 50%'
				},


				'& .MuiTypography-root.MuiTypography-h1': {
					fontWeight: 'bold',
					fontSize: {
						xs: '28px',
						md: '40px'
					},
					lineHeight: '44px',
					letterSpacing: '2px',
					color: 'primary.main',
					mb: '16px'
				},

				'& .MuiTypography-root.MuiTypography-body1': {
					fontSize: '16px',
					letterSpacing: '0.5px',
					fontFamily: 'fontPE',
					m: '8px 0',
					overflow: 'hidden'
				}

			}}>
				<Typography variant="h1">{data.title}</Typography>

				<Box>
					{contents?.map((content, index) => (
						<Typography
							variant="body1"
							component="p"
							key={index}
						>
							{content}
						</Typography>
					))}
					{/* Sửa isShow thành isShowMoreButton */}
					{isShowMoreButton && (
						<Typography
							variant="body1"
							component="p"
							onClick={handleShowAllContent}
							sx={{
								cursor: 'pointer',
								fontWeight: 'bold',
								mt: '16px'
							}}
						>
							Xem thêm
						</Typography>
					)}
				</Box>
			</Box>
		</Box >
	)
}
export default BlogInTheLeft