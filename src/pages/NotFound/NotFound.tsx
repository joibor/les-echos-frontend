import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

export const NotFound = () => {
  const navigate = useNavigate()

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
      py={8}
    >
      <Typography variant="h3" fontWeight={700} color="primary">
        404
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Cette page n'existe pas.
      </Typography>
      <Button variant="contained" onClick={() => navigate('/')}>
        Retour à l'accueil
      </Button>
    </Box>
  )
}
