import type { SubscriptionRight } from '@/types/user'

export type CategorySite = 'DEN' | 'DAN' | 'LAN' | 'SAN'
export type Newsletter = {
  id: string
  image: string
  title: string
  description: string
  site: CategorySite
  subscriptions: SubscriptionRight[]
}
