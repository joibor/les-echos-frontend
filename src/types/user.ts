export type SubscriptionRight = 'RIGHT_1' | 'RIGHT_2'

export type Gender = 'M' | 'F'

export type User = {
  id: string
  firstName: string
  lastName: string
  gender: Gender
  email: string
  subscriptions: SubscriptionRight[]
}

export type UserProfile = {
  label: string
  user: User
}
