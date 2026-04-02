import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { NEWSLETTER_ITEMS } from '@/mocks/newsletters'
import { NewsletterCard } from '@/components/NewsletterCard/NewsletterCard'
import { groupBySite, objectEntries, type CategorySite } from '@/utils/newsletters'

import type { JSX } from 'react'

const SIZE_COLUMN = { xs: 12, md: 6, lg: 4 }

const SITE_NAME: Record<CategorySite, string> = {
  DEN: 'Les echos',
  DAN: 'Investir',
  LAN: 'Le parisien',
  SAN: 'LVMH',
}

export const Home = (): JSX.Element => {
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
                    requiredRights={newsletter.subscriptions}
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
