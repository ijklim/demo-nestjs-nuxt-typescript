export default defineNuxtRouteMiddleware((to, from) => {
  const { token } = useAuth()

  // Allow access if token exists in cookie OR in query params (OAuth callback)
  const hasToken = token.value || to.query.token

  if (!hasToken && to.path !== '/') {
    return navigateTo('/')
  }
})
