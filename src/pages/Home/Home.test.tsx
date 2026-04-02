import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { UserProvider } from '@/context/UserContext.tsx'
import { SubscriptionProvider } from '@/context/SubscriptionContext.tsx'
import { Home } from './Home.tsx'
import theme from '@/theme'
import { NEWSLETTER_ITEMS } from '@/mocks/newsletters.ts'

const renderHome = () =>
  render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <SubscriptionProvider>
            <Home />
          </SubscriptionProvider>
        </UserProvider>
      </ThemeProvider>
    </MemoryRouter>
  )

describe('Home', () => {
  it('Should render a section for each site', () => {
    renderHome()

    expect(screen.getByText('Les echos')).toBeInTheDocument()
    expect(screen.getByText('Investir')).toBeInTheDocument()
    expect(screen.getByText('Le parisien')).toBeInTheDocument()
    expect(screen.getByText('LVMH')).toBeInTheDocument()
  })

  it('Should render all newsletter cards', () => {
    renderHome()

    NEWSLETTER_ITEMS.forEach((newsletter) => {
      expect(screen.getByText(newsletter.title)).toBeInTheDocument()
    })
  })

  it("Should render S'inscrire for newsletters with no required rights", () => {
    renderHome()

    const freeNewsletters = NEWSLETTER_ITEMS.filter((item) => item.subscriptions.length == 0)

    expect(screen.getAllByText("S'inscrire")).toHaveLength(freeNewsletters.length)
  })

  it("Should render S'abonner for newsletters requiring rights the user does not have", () => {
    renderHome()

    const paidNewsletters = NEWSLETTER_ITEMS.filter((item) => item.subscriptions.length)

    expect(screen.getAllByText("S'abonner")).toHaveLength(paidNewsletters.length)
  })
})
