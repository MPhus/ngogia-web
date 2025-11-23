import Header from "~/components/Header"
import { Box } from '@mui/material'
import Slide from "~/components/Slide"
import Footer from "~/components/Footer"
import BlogInTheCenter from "~/components/BlogInTheCenter"
import BlogInTheLeft from "~/components/BlogInTheLeft"
import { useEffect, useState } from "react"
import { API_getOverview } from "~/apis"

function Overview({ info }) {
	const [overview, setOverview] = useState(undefined)
	console.log(' overview: ', overview)
	useEffect(() => {
		API_getOverview().then(data => setOverview(data))
			.catch((err => console.log('err', err)
			))
	}, [])
	return (
		<Box>
			<Header />
			<Slide />
			{overview && overview?.map(data => <Box key={data?._id}>
				{data?.isCenter ?
					<BlogInTheCenter data={data} darkTheme={data?.isDark} /> :
					<BlogInTheLeft data={data} darkTheme={data?.isDark} />
				}
			</Box>

			)}
			{/* <BlogInTheCenter data={blogCenter} darkTheme={false} />
			<BlogInTheLeft data={blogLeft} darkTheme={true} /> */}
			<Footer data={info} />
		</Box>
	)
}

export default Overview

