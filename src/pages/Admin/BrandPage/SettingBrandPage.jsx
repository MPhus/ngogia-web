import { memo, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import EditIcon from '@mui/icons-material/Edit'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload'

import { toast } from 'react-toastify'
import SettingThumb from '../SettingThumb'


const SettingBrandPage = memo(({ brandPage }) => {
	console.log(' brandPage: ', brandPage)
	const test = (a) => {
		console.log('test:', a)
	}
	return (

		<Box>
			{brandPage && <SettingThumb thumb={brandPage.slide.thumb} updateSlide={test} />}
		</Box>
	)
})
export default SettingBrandPage