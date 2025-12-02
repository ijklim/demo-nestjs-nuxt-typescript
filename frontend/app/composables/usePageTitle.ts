/**
 * Composable to set page title dynamically based on route name
 * Capitalizes the route name and appends the app title suffix
 */
export const usePageTitle = (customTitle?: string) => {
  const route = useRoute()
  const config = useRuntimeConfig()

  let pageTitle = customTitle || ''

  // If custom title is not provided, derive from route name
  if (!customTitle) {
    const routeName = route.name as string

    // Convert route name to title case
    // 'index' -> 'Home', 'dashboard' -> 'Dashboard', 'suggest-console' -> 'Suggest Console'
    pageTitle = routeName === 'index'
    ? 'Home'
    : routeName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
  }

  useSeoMeta({
    title: `${pageTitle} | ${config.public.title}`,
  })
}
