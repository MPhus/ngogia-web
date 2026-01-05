import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import React from "react"
import { useNavigate } from "react-router-dom"
import Button from "@mui/material/Button"
import EastIcon from '@mui/icons-material/East'

function LinkOverView({ data }) {
	const natigate = useNavigate()

	return <Box>
		<Box sx={{
			background: `url(${data.bgOverview}) no-repeat center center/cover  `,
			minWidth: '100%',
			maxWidth: '100%',
			minHeight: '520px',
			maxHeight: '520px',
			position: 'relative'
		}}>
			<Box sx={{
				minWidth: { xs: '80%', md: '50%', xl: '40%' },
				maxWidth: { xs: '80%', md: '50%', xl: '40%' },
				minHeight: '80%',
				maxHeight: '80%',
				top: '50%',
				position: 'absolute',
				transform: 'translate(-50%, -50%)',
				left: '50%',
				borderRadius: '4px',
				boxShadow: '0px 0px 32px #000',
				p: '32px',
				textAlign: 'center',
				backgroundColor: 'background.default',
				'& .MuiTypography-root.MuiTypography-h2': {
					fontSize: { xs: '3rem', sm: '4rem' },
					mb: '20px',
					fontFamily: 'Vollkorn',

				},
				'& .MuiTypography-root.MuiTypography-body1': {
					fontSize: { xs: '1rem', sm: '1.2rem' },
					lineHeight: '1.6',
					color: '#97958f'
				},
			}}>
				<Typography variant="h2">{data?.title}</Typography>
				<Typography variant="body1" sx={{
					maxHeight: '180px',
					textAlign: 'justify',
					overflow: 'hidden',
					textOverflow: 'ellipsis',
					WebkitLineClamp: '5',
					display: '-webkit-box',
					WebkitBoxOrient: 'vertical',
					whiteSpace: 'normal'
				}}>
					{data?.subcontent}
				</Typography>
				<Button onClick={() => {
					natigate('/overview')
				}}
					sx={{
						color: '#fff',
						padding: { xs: '12px 20px', sm: '20px 32px' },
						fontSize: '1.2rem',
						textTransform: 'uppercase',
						mt: '32px',
						minWidth: { xs: '200px', xl: '320px' },
						justifyContent: 'space-between',
						border: 'none',
						backgroundColor: 'primary.main',
						'&:hover': {
							opacity: '0.8',
							backgroundColor: 'tranparent '
						},
						'& .MuiSvgIcon-root': {
							fontSize: '28px !important'
						}
					}} endIcon={< EastIcon />}>Tìm hiểu thêm</Button >
			</Box>
		</Box>
	</Box>
}

export default LinkOverView
