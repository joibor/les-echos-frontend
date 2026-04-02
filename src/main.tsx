import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from '@/theme'
import { UserProvider } from '@/context/UserContext'
import { SubscriptionProvider } from '@/context/SubscriptionContext'
import App from './App'

const root = document.getElementById('root')

if (!root) {
  throw new Error('Root element not found!')
}

createRoot(root).render(
  // StrictMode double-invokes renders and effects in development.
  // Disable it when using the React Profiler or the Performance tab.
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserProvider>
          <SubscriptionProvider>
            <App />
          </SubscriptionProvider>
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)
