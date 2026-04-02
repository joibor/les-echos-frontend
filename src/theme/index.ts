import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#c0272d',
    },
    secondary: {
      main: '#c8a84b',
    },
  },
  typography: {
    fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'].join(
      ','
    ),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '30px',
          textTransform: 'none',
          fontWeight: 600,
          padding: '8px 20px',
        },
      },
    },
  },
})

export default theme
