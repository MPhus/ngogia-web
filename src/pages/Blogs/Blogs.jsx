import Header from "~/components/Header"
import { Box } from '@mui/material'
import Slide from "~/components/Slide"
import Footer from "~/components/Footer"
import BlogInTheCenter from "~/components/BlogInTheCenter"
import BlogInTheLeft from "~/components/BlogInTheLeft"
import LinkNews from "../Home/LinkNews"

function Blog() {
	const newCenter = {
		content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.\nVoluptatem similique laborum esse minima suscipit, nisi doloremque dolore rem! Similique,\nnumquam dolorem minus ad molestias dolor rem culpa ab quisquam quis voluptatem! Veritatis, eum suscipit nihil quam in pariatur itaque, exercitationem qui explicabo voluptates aliquam iusto omnis.\nMolestiae sequi aliquam et, sint tempora fuga facere dolor consectetur necessitatibus consequatur non quis tenetur placeat odit rerum sunt velit cum quisquam quasi vero rem tempore omnis eaque? \nEa omnis, esse ipsum aliquam eos vero libero ad neque dolorem repellat expedita impedit voluptates pariatur!',
		title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore?',
		isDark: false,
		thumb: 'https://res.cloudinary.com/divrizdwo/image/upload/v1758960383/NIA_130525_-1_zdtkqj.jpg'
	}
	const newLeft = {
		content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.\nVoluptatem similique laborum esse minima suscipit, nisi doloremque dolore rem! Similique,\nnumquam dolorem minus ad molestias dolor rem culpa ab quisquam quis voluptatem! Veritatis, eum suscipit nihil quam in pariatur itaque, exercitationem qui explicabo voluptates aliquam iusto omnis.\nMolestiae sequi aliquam et, sint tempora fuga facere dolor consectetur necessitatibus consequatur non quis tenetur placeat odit rerum sunt velit cum quisquam quasi vero rem tempore omnis eaque? \nEa omnis, esse ipsum aliquam eos vero libero ad neque dolorem repellat expedita impedit voluptates pariatur!',
		title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore?',
		isDark: false,
		thumb: 'https://res.cloudinary.com/divrizdwo/image/upload/v1758960383/NIA_130525_-1_zdtkqj.jpg'
	}
	return (
		<Box>
			<Header />
			<Box sx={{ mt: '80px' }}>

				<BlogInTheCenter data={newCenter} darkTheme={false} />
			</Box>

			<LinkNews inBlogsPage />
			<Footer />
		</Box>
	)
}

export default Blog
