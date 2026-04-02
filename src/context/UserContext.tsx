import { createContext, useContext, useReducer } from 'react'
import type { ReactNode, Dispatch } from 'react'
import type { User } from '@/types/user'
import { USER_WITHOUT_SUBSCRIPTION } from '@/mocks/users'

type UserState = {
  currentUser: User
}

type UserContextValue = {
  state: UserState
  dispatch: Dispatch<UserAction>
}

const initialState: UserState = {
  currentUser: USER_WITHOUT_SUBSCRIPTION,
}

const UserActionTypes = {
  SELECT_USER: 'SELECT_USER',
} as const

type UserAction = { type: typeof UserActionTypes.SELECT_USER; payload: User }

const userReducer = (_: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case UserActionTypes.SELECT_USER:
      return { currentUser: action.payload }
  }
}

const UserContext = createContext<UserContextValue | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialState)

  return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>
}

export const useUserContext = (): UserContextValue => {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider')
  }

  return context
}

export { UserActionTypes }
