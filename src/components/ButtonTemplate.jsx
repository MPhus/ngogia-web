import { Button } from "@mui/material"
import React from "react"
import EastIcon from '@mui/icons-material/East'

function ButtonTemplate({ content, variant }) {
	return <Button variant={variant} sx={{
		color: '#fff',
		padding: '20px 32px',
		fontSize: '1.2rem',
		textTransform: 'uppercase',
		minWidth: '400px',
		justifyContent: 'space-between',
		border: 'none',
		mt: '40px',
		backgroundColor: variant !== 'text' ? '#000' : 'tranparent',
		'&:hover': {
			opacity: '0.8',
			backgroundColor: variant === 'text' ? 'tranparent !important' : 'tranparent '
		},
		'& .MuiSvgIcon-root': {
			fontSize: '28px !important'
		}
	}} endIcon={< EastIcon />}> {content}</Button >
}

export default ButtonTemplate
