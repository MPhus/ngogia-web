import { createTheme } from '@mui/material/styles'

const HEADER_HEIGHT = '80px'
// const BROAD_BAR_HEIGHT = '60px'
// const BROAD_CONTENT_HEIGHT = `calc( 100vh - ${APP_BAR_HEIGHT} - ${BROAD_BAR_HEIGHT})`
// const COLUMN_HEADER_HEIGHT = '48px'
// const COLUMN_FOOTER_HEIGHT = '48px'

// Create a theme instance.
const theme = createTheme({
	custom: {
		headerHeight: HEADER_HEIGHT
	},
	palette: {
		primary: {
			main: '#ca1a75',
			dark: '#eeb7cd',
			contrastText: '#1f1c17'
		},
		secondary: {
			main: '#ffc0cb',
			dark: '#000',
			contrastText: '#000'
		},
		text: {
			primary: '#333'
		},
		background: {
			default: '#fff',
			paper: '#fff'
		}
	},
	typography: {
		fontFamily: '"Nunito", "Helvetica", "Arial", sans-serif',
		fontCustom: '"Anek Odia", sans-serif',
		fontPE: '"Playwrite PE", cursive'
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					'*::-webkit-scrollbar': {
						width: '4px',
						height: '4px'
					},
					'*::-webkit-scrollbar-thumb': {
						backgroundColor: '#ffc0cb',
						borderRadius: 4
					},
					'*::-webkit-scrollbar-track ': {
						margin: '8px 0'
					},
					'*::-webkit-scrollbar-thumb:hover': {
						backgroundColor: '#ffc0cb'
					}
				}
			}
		},
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'capitalize'
				}
			}
		},
		MuiFormLabel: {
			styleOverrides: {
				root: ({ theme }) => ({
					color: '#333 !important',
					[theme.breakpoints.up('md')]: {
						fontSize: '15px',
						lineHeight: '1.4'
					},
					[theme.breakpoints.down('md')]: {
						fontSize: '16px',
						lineHeight: '2'
					},
					// left: 'auto !important',
					// right: '50px'
				})
			}
		},
		MuiTypography: {
			styleOverrides: {
				root: {
					'&.MuiTypography-body1': {
						fontSize: '0.875rem'
					}
				}
			}
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: ({ theme }) => ({
					color: theme.palette.primary.dark,
					fontSize: '16px',
					'& .MuiOutlinedInput-notchedOutline': {
						borderColor: theme.palette.primary.light,
						borderWidth: '1px !important'
					},
					'&:hover .MuiOutlinedInput-notchedOutline': {
						borderColor: theme.palette.primary.main
					}
				})
			}

		}

	}
})

export default theme
