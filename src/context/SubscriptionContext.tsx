import { createContext, useContext, useReducer } from 'react'
import type { ReactNode, Dispatch } from 'react'

type SubscriptionState = {
  subscribedNewsletterIds: string[]
}

const initialState: SubscriptionState = {
  subscribedNewsletterIds: [],
}

export const SubscriptionActionTypes = {
  ADD_SUBSCRIPTION: 'ADD_SUBSCRIPTION',
  REMOVE_SUBSCRIPTION: 'REMOVE_SUBSCRIPTION',
  RESET: 'RESET',
} as const

type SubscriptionAction =
  | { type: typeof SubscriptionActionTypes.ADD_SUBSCRIPTION; payload: string }
  | { type: typeof SubscriptionActionTypes.REMOVE_SUBSCRIPTION; payload: string }
  | { type: typeof SubscriptionActionTypes.RESET }

const subscriptionReducer = (
  state: SubscriptionState,
  action: SubscriptionAction
): SubscriptionState => {
  switch (action.type) {
    case SubscriptionActionTypes.ADD_SUBSCRIPTION:
      return { subscribedNewsletterIds: [...state.subscribedNewsletterIds, action.payload] }

    case SubscriptionActionTypes.REMOVE_SUBSCRIPTION:
      return {
        subscribedNewsletterIds: state.subscribedNewsletterIds.filter(
          (id) => id !== action.payload
        ),
      }

    case SubscriptionActionTypes.RESET:
      return initialState
  }
}

const SubscriptionStateContext = createContext<SubscriptionState | undefined>(undefined)
const SubscriptionDispatchContext = createContext<Dispatch<SubscriptionAction> | undefined>(
  undefined
)

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(subscriptionReducer, initialState)

  return (
    <SubscriptionDispatchContext.Provider value={dispatch}>
      <SubscriptionStateContext.Provider value={state}>
        {children}
      </SubscriptionStateContext.Provider>
    </SubscriptionDispatchContext.Provider>
  )
}

export const useSubscriptionState = (): SubscriptionState => {
  const context = useContext(SubscriptionStateContext)
  if (!context) throw new Error('useSubscriptionState must be used within a SubscriptionProvider')
  return context
}

export const useSubscriptionDispatch = (): Dispatch<SubscriptionAction> => {
  const context = useContext(SubscriptionDispatchContext)
  if (!context)
    throw new Error('useSubscriptionDispatch must be used within a SubscriptionProvider')
  return context
}
