import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { UserProvider } from '@/context/UserContext'
import { SubscriptionProvider } from '@/context/SubscriptionContext'
import { Layout } from './Layout'
import theme from '@/theme'

const renderLayout = (route = '/') =>
  render(
    <MemoryRouter initialEntries={[route]}>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <SubscriptionProvider>
            <Layout />
          </SubscriptionProvider>
        </UserProvider>
      </ThemeProvider>
    </MemoryRouter>
  )

describe('Layout', () => {
  it('Should render the header title', () => {
    renderLayout()

    expect(screen.getByText('Newsletters')).toBeInTheDocument()
  })

  it('Should render all profile options in the select when opened', async () => {
    renderLayout()

    await userEvent.click(screen.getByRole('combobox'))

    const options = screen.getAllByRole('option').map((o) => o.textContent)

    expect(options).toContain('Jamie Doe - Sans abonnement')
    expect(options).toContain('Jamie Doe - Un abonnement')
    expect(options).toContain('Jamie Doe - Plusieurs abonnements')
  })

  it('Should select the first profile by default', () => {
    renderLayout()

    expect(screen.getByText('Jamie Doe - Sans abonnement')).toBeInTheDocument()
  })

  it('Should render the main content area', () => {
    renderLayout()

    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('Should update selected profile when a new option is chosen', async () => {
    renderLayout()

    await userEvent.click(screen.getByRole('combobox'))
    await userEvent.click(screen.getByText('Jamie Doe - Plusieurs abonnements'))

    expect(screen.getByRole('combobox')).toHaveTextContent('Jamie Doe - Plusieurs abonnements')
  })
})
