import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import type { FallbackProps } from 'react-error-boundary'

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const message = error instanceof Error ? error.message : 'Erreur inconnue'

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
      py={8}
    >
      <Typography variant="h6" color="error">
        Une erreur est survenue
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
      <Button variant="contained" onClick={resetErrorBoundary}>
        Réessayer
      </Button>
    </Box>
  )
}
