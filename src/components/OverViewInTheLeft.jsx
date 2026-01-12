// BlogInTheLeft.jsx
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useContentTruncation from './useContentTruncation' // Import hook mới

function OverViewInTheLeft({ data, isRight, setting, isBrand }) {
	const { contents, isShowMoreButton, handleShowAllContent } = useContentTruncation(data.content)

	return (
		<Box sx={{
			maxWidth: {
				md: '1000px',
				lg: '1200px'
			},
			margin: isRight ? { xs: '20px auto', sm: '40px auto', md: '0 auto' } : '0 auto',
			display: 'flex',
			flexDirection: {
				xs: 'column-reverse',
				md: isRight ? 'row-reverse' : 'row'
			},
			alignItems: 'center',
			backgroundColor: 'background.default',
			color: 'text.primary',
			gap: '40px',
			padding: {
				xs: '0 20px',
				lg: ''
			},
			boxSizing: 'border-box'
		}}>


			<Box sx={{
				flex: {
					xs: '1 1 100%',
					md: '0 0 50%',
				},
			}}>
				<img src={data.thumb}
					alt={data.title}
					style={{
						width: '100%',
						height: isBrand ? '640px' : 'auto',
						display: 'block'
					}}
				/>
			</Box>

			<Box sx={{

				textAlign: {
					xs: 'center',
					lg: 'left'
				},
				fontFamily: "Arial",
				flex: {
					xs: '1 1 100%'
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
					textAlign: 'justify',
					fontFamily: "Arial",
					m: '8px 0',
					overflow: 'hidden'
				}

			}}>
				<img src={data?.logo}
					alt=""
					style={{
						maxWidth: '200px',
						display: !data.title ? 'block' : 'none'
					}}
				/>
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
export default OverViewInTheLeft