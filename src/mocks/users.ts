import type { User, UserProfile } from '@/types/user'

const BASE_USER = {
  firstName: 'Jamie',
  lastName: 'Doe',
  gender: 'M' as const,
  email: 'jamie.doe@example.com',
}

export const USER_WITHOUT_SUBSCRIPTION: User = {
  ...BASE_USER,
  id: '507f1f77bcf86cd799439011',
  subscriptions: [],
}

export const USER_WITH_ONE_SUBSCRIPTION: User = {
  ...BASE_USER,
  id: '507f1f77bcf86cd799439012',
  subscriptions: ['RIGHT_1'],
}

export const USER_WITH_MULTIPLE_SUBSCRIPTION: User = {
  ...BASE_USER,
  id: '507f1f77bcf86cd799439013',
  subscriptions: ['RIGHT_1', 'RIGHT_2'],
}

export const PROFILES: UserProfile[] = [
  { label: 'Jamie Doe - Sans abonnement', user: USER_WITHOUT_SUBSCRIPTION },
  { label: 'Jamie Doe - Un abonnement', user: USER_WITH_ONE_SUBSCRIPTION },
  { label: 'Jamie Doe - Plusieurs abonnements', user: USER_WITH_MULTIPLE_SUBSCRIPTION },
]
