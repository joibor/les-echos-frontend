import { memo, useState } from 'react'
import type { MouseEvent, JSX } from 'react'
import Button from '@mui/material/Button'
import { ConfirmDialog } from '@/components/ConfirmDialog/ConfirmDialog'
import { Card, Thumbnail, Body, Footer, Description } from './Newsletter.style'
import { useSubscriptionDispatch, SubscriptionActionTypes } from '@/context/SubscriptionContext'
import Typography from '@mui/material/Typography'

type NewsletterCardProps = {
  id: string
  title: string
  description: string
  hasAccess: boolean
  isSubscribed: boolean
}

export const NewsletterCard = memo(
  ({ id, title, description, hasAccess, isSubscribed }: NewsletterCardProps): JSX.Element => {
    const dispatch = useSubscriptionDispatch()
    const [confirmOpen, setConfirmOpen] = useState(false)

    const handleInscription = (event: MouseEvent<HTMLButtonElement>) => {
      if (isSubscribed) {
        event.currentTarget.blur()
        setConfirmOpen(true)
      } else {
        dispatch({ type: SubscriptionActionTypes.ADD_SUBSCRIPTION, payload: id })
      }
    }

    const handleConfirmUnsubscribe = () => {
      dispatch({ type: SubscriptionActionTypes.REMOVE_SUBSCRIPTION, payload: id })
      setConfirmOpen(false)
    }

    return (
      <>
        <Card>
          <Thumbnail>
            <Typography variant="h6" sx={{ color: 'white', textAlign: 'center', fontWeight: 600 }}>
              {title}
            </Typography>
          </Thumbnail>

          <Body>
            <Description variant="body2" color="text.secondary">
              {description}
            </Description>
          </Body>

          <Footer>
            {hasAccess ? (
              <Button variant="contained" color="primary" size="small" onClick={handleInscription}>
                {isSubscribed ? 'Se désinscrire' : "S'inscrire"}
              </Button>
            ) : (
              <Button variant="contained" color="secondary" size="small">
                S'abonner
              </Button>
            )}
          </Footer>
        </Card>

        <ConfirmDialog
          open={confirmOpen}
          title="Se désinscrire"
          description={`Voulez-vous vous désinscrire de la newsletter ${title} ?`}
          confirmLabel="Se désinscrire"
          onConfirm={handleConfirmUnsubscribe}
          onCancel={() => setConfirmOpen(false)}
        />
      </>
    )
  }
)
