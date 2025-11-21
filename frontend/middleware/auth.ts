export default defineNuxtRouteMiddleware((to, from) => {
  const { token } = useAuth()

  if (!token.value && to.path !== '/') {
    return navigateTo('/')
  }
})
