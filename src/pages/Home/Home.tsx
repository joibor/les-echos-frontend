import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { NEWSLETTER_ITEMS } from '@/mocks/newsletters.ts'
import { NewsletterCard } from '@/components/NewsletterCard/NewsletterCard.tsx'
import { groupBySite, objectEntries } from '@/utils/newsletters.ts'
import { useUserContext } from '@/context/UserContext'
import { useSubscriptionState } from '@/context/SubscriptionContext'

import type { CategorySite } from '@/types/newsletter'
import type { JSX } from 'react'

const SIZE_COLUMN = { xs: 12, md: 6, lg: 4 }

const SITE_NAME: Record<CategorySite, string> = {
  DEN: 'Les echos',
  DAN: 'Investir',
  LAN: 'Le parisien',
  SAN: 'LVMH',
}

export const Home = (): JSX.Element => {
  const { state: userState } = useUserContext()
  const { subscribedNewsletterIds } = useSubscriptionState()
  const grouped = groupBySite(NEWSLETTER_ITEMS)

  return (
    <section style={{ padding: 32, maxWidth: 1000, margin: '0 auto' }}>
      {objectEntries(grouped).map(
        ([site, newsletters]): JSX.Element => (
          <section key={site} style={{ marginBottom: 48 }}>
            <Typography variant="overline" fontWeight={700}>
              {SITE_NAME[site]}
            </Typography>
            <Divider sx={{ borderColor: 'primary.main', borderWidth: 2, width: 40, mb: 3 }} />

            <Grid container spacing={3}>
              {newsletters.map((newsletter) => (
                <Grid key={newsletter.id} size={SIZE_COLUMN}>
                  <NewsletterCard
                    id={newsletter.id}
                    title={newsletter.title}
                    description={newsletter.description}
                    hasAccess={
                      newsletter.subscriptions.length === 0 ||
                      newsletter.subscriptions.some((right) =>
                        userState.currentUser.subscriptions.includes(right)
                      )
                    }
                    isSubscribed={subscribedNewsletterIds.includes(newsletter.id)}
                  />
                </Grid>
              ))}
            </Grid>
          </section>
        )
      )}
    </section>
  )
}
