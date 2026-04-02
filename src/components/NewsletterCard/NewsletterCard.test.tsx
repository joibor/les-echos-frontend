import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from '@mui/material/styles'
import { SubscriptionProvider, useSubscriptionState } from '@/context/SubscriptionContext'
import { NewsletterCard } from './NewsletterCard'
import theme from '@/theme'

const DEFAULT_ID = 'newsletter-1'

// Mirrors how Home passes isSubscribed to the card
const ConnectedCard = (props: Partial<React.ComponentProps<typeof NewsletterCard>> = {}) => {
  const { subscribedNewsletterIds } = useSubscriptionState()
  return (
    <NewsletterCard
      id={DEFAULT_ID}
      title="La matinale"
      description="Les articles du matin."
      hasAccess={true}
      isSubscribed={subscribedNewsletterIds.includes(DEFAULT_ID)}
      {...props}
    />
  )
}

const renderCard = (props: Partial<React.ComponentProps<typeof NewsletterCard>> = {}) =>
  render(
    <ThemeProvider theme={theme}>
      <SubscriptionProvider>
        <ConnectedCard {...props} />
      </SubscriptionProvider>
    </ThemeProvider>
  )

describe('NewsletterCard', () => {
  it('Should render title and description', () => {
    renderCard()

    expect(screen.getByText('La matinale')).toBeInTheDocument()
    expect(screen.getByText('Les articles du matin.')).toBeInTheDocument()
  })

  it("Should render S'inscrire when user has access", () => {
    renderCard({ hasAccess: true })

    expect(screen.getByText("S'inscrire")).toBeInTheDocument()
  })

  it("Should render S'abonner when user does not have access", () => {
    renderCard({ hasAccess: false })

    expect(screen.getByText("S'abonner")).toBeInTheDocument()
  })

  it("Should render Se désinscrire after clicking S'inscrire", async () => {
    renderCard()

    await userEvent.click(screen.getByText("S'inscrire"))

    expect(screen.getByText('Se désinscrire')).toBeInTheDocument()
  })

  it('Should open confirm dialog when clicking Se désinscrire', async () => {
    renderCard()

    await userEvent.click(screen.getByText("S'inscrire"))
    await userEvent.click(screen.getByText('Se désinscrire'))

    expect(
      screen.getByText('Voulez-vous vous désinscrire de la newsletter La matinale ?')
    ).toBeInTheDocument()
  })

  it("Should restore S'inscrire after confirming unsubscription", async () => {
    renderCard()

    await userEvent.click(screen.getByText("S'inscrire"))
    await userEvent.click(screen.getByText('Se désinscrire'))
    await userEvent.click(
      within(screen.getByRole('dialog')).getByRole('button', { name: 'Se désinscrire' })
    )

    expect(screen.getByText("S'inscrire")).toBeInTheDocument()
  })

  it('Should keep subscription when cancelling the confirm dialog', async () => {
    renderCard()

    await userEvent.click(screen.getByText("S'inscrire"))
    await userEvent.click(screen.getByText('Se désinscrire'))
    await userEvent.click(within(screen.getByRole('dialog')).getByText('Annuler'))

    expect(screen.getByRole('button', { name: 'Se désinscrire' })).toBeInTheDocument()
  })
})
