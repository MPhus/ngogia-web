import React, { useEffect, useState } from "react"
import Header from "~/components/Header"
import { Box } from '@mui/material'
import Slide from "~/components/Slide"
import Footer from "~/components/Footer"
import LinkOverView from "./LinkOverView"
import MarqueeText from "./MarqueeText"
import HotProduct from "./HotProduct"
import LinkBrands from "./LinkBrands"
import LinkNews from "./LinkNews"
import { API_GetHomePage, API_GetHotNews } from "~/apis"
import CircularProgress from '@mui/material/CircularProgress'
function Home({ info }) {
	const [loading, setLoading] = useState(true)
	const [homePage, setHomePage] = useState(null)
	const [hotNews, setHotNews] = useState([])
	useEffect(() => {
		API_GetHomePage('').then(data => setHomePage(data))
			.catch(err => console.log('err home page:', err)
			)
		setLoading(false)
	}, [])
	useEffect(() => {
		API_GetHotNews(4).then(data => setHotNews(data))
			.catch(err => console.log('err hot news:', err)
			)
	}, [])
	return (
		<Box>

			{!loading && <Box>
				<Header />
				<Slide data={homePage?.slide} />
				<HotProduct data={homePage?.hotProduct} />
				<LinkOverView data={{ ...homePage?.overview, bgOverview: homePage?.bgOverview }} />
				<MarqueeText data={homePage?.fallText} />
				<LinkBrands data={homePage?.reviewBrand} />
				<LinkNews dataList={hotNews} />
				<Footer data={info} />
			</Box>}
		</Box>
	)
}

export default Home
