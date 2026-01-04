import Header from "~/components/Header"
import { Box } from '@mui/material'
import Footer from "~/components/Footer"
import { useEffect, useState } from "react"
import { API_getOverview } from "~/apis"
import OverViewInTheLeft from '~/components/OverViewInTheLeft'

function Overview({ info }) {
	const [overview, setOverview] = useState(undefined)
	useEffect(() => {
		API_getOverview().then(data => setOverview(data))
			.catch((err => console.log('err', err)
			))
	}, [])
	return (
		<Box>
			<Header />
			<Box sx={{ m: '120px 0 40px 0 ' }}>
				{overview && overview?.map(data => <Box key={data?._id} >
					<OverViewInTheLeft data={data} isRight={data?.isRight} />
				</Box>
				)}
			</Box>

			<Footer data={info} />
		</Box>
	)
}

export default Overview

