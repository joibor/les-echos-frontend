import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Select, { type SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import { UserActionTypes, useUserContext } from '@/context/UserContext'
import { SubscriptionActionTypes, useSubscriptionDispatch } from '@/context/SubscriptionContext'
import { PROFILES } from '@/mocks/users.ts'

export const Header = () => {
  const {
    state: { currentUser },
    dispatch,
  } = useUserContext()
  const dispatchSubscription = useSubscriptionDispatch()

  const handleSelect = (event: SelectChangeEvent) => {
    const profile = PROFILES.find((p) => p.user.id === event.target.value)
    if (profile) {
      dispatch({ type: UserActionTypes.SELECT_USER, payload: profile.user })
      dispatchSubscription({ type: SubscriptionActionTypes.RESET })
    }
  }

  return (
    <>
      <Box
        component="header"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={2}
        mt={3}
        sx={{ backgroundColor: '#e0e0e0', borderRadius: '5px', width: '100%' }}
      >
        <div>
          <Typography
            variant="h6"
            fontWeight={700}
            letterSpacing={1}
            color="black"
            textAlign="center"
            sx={{ textTransform: 'uppercase' }}
          >
            Newsletters
          </Typography>
          <Typography variant="caption" color="black" textAlign="center" display="block">
            Dans cette page, vous retrouvez l'ensemble des newsletters des Echos et des marques
            satellites. Ainsi, vous pouvez découvrir toutes nos newsletters selon vos centres
            d'intérêt et gérer plus facilement l'inscription à vos newsletters.
          </Typography>
        </div>
      </Box>
      <FormControl size="small" sx={{ mt: 2 }}>
        <InputLabel id="profile">Profil</InputLabel>
        <Select labelId="profile" label="Profil" value={currentUser.id} onChange={handleSelect}>
          {PROFILES.map(({ label, user }) => (
            <MenuItem key={user.id} value={user.id}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  )
}
