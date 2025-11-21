export const useAuth = () => {
  const token = useCookie('auth_token')
  const user = useState('auth_user', () => null)

  const setToken = (newToken: string) => {
    token.value = newToken
  }

  const setUser = (newUser: any) => {
    user.value = newUser
  }

  const logout = () => {
    token.value = null
    user.value = null
    navigateTo('/')
  }

  return {
    token,
    user,
    setToken,
    setUser,
    logout
  }
}
