import { Box, Button, Card, CardContent, CardHeader, CardMedia, Typography } from "@mui/material"
import React from "react"
import EastIcon from '@mui/icons-material/East'
import { useNavigate } from "react-router-dom"
import { isEmpty } from "lodash"


function LinkNews({ inBlogsPage, dataList }) {
	const navigate = useNavigate()

	return <Box sx={{ minWidth: '1200px', maxWidth: '1200px', m: '0 auto', padding: '80px 0' }}>
		<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '20px' }}>
			<Typography variant="h2" sx={{}}>Tin tức mới nhất</Typography>

		</Box>
		<Box sx={{ display: 'grid', gridTemplateColumns: ' repeat(4, 1fr)', gap: '40px' }}>
			{!isEmpty(dataList) &&
				dataList?.map(news => {
					return (

						<Card sx={{
							'&:hover': {
								cursor: 'pointer',
								boxShadow: '0 0 12px 0 #ca1a75'
							}
						}}
							onClick={() => {
								navigate(`blogs/${news._id}`)
							}}
							key={news._id}>

							<CardHeader
								title={news?.title}
								sx={{
									'&  .MuiTypography-root.MuiTypography-h5.MuiCardHeader-title': {
										width: '300px',
										whiteSpace: 'nowrap',
										overflow: 'hidden',
										textOverflow: 'ellipsis',
										maxHeight: '64px'
									}
								}}
							/>
							<CardMedia
								component="img"
								height="194"
								image={news?.thumb}
								alt="Paella dish"
							/>
							<CardContent >
								<Typography variant="body2" sx={{
									color: 'text.secondary',
									maxHeight: '180px',
									textAlign: 'justify',
									overflow: 'hidden',
									textOverflow: 'ellipsis',
									WebkitLineClamp: '6',
									display: '-webkit-box',
									WebkitBoxOrient: 'vertical',
									whiteSpace: 'normal'
								}}>
									{news?.content}
								</Typography>
							</CardContent>

						</Card>
					)
				})
			}

		</Box>
	</Box>
}

export default LinkNews
