import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'

export const Layout = () => {
  return (
    <Box minHeight="100vh">
      <Container maxWidth="md">
        <Header />
        <Box component="main">
          <Outlet />
        </Box>
      </Container>
    </Box>
  )
}
