export default defineNuxtPlugin(() => {
  const auth = useAuthStore()
  const router = useRouter()

  router.beforeEach((to) => {
    const publicRoutes = ['/', '/login', '/register', '/auth-required']

    if (!publicRoutes.includes(to.path) && !auth.isAuthenticated) {
      return navigateTo('/auth-required')
    }
  })
})
