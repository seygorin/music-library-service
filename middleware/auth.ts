export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) {
    const auth = useAuthStore()
    const publicRoutes = ['/', '/login', '/register', '/auth-required']

    if (!publicRoutes.includes(to.path) && !auth.isAuthenticated) {
      return navigateTo('/auth-required')
    }
  }
})
