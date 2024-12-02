export default defineNuxtPlugin((nuxtApp) => {
  const auth = useAuthStore()

  if (import.meta.client) {
    nuxtApp.hook('app:created', () => {
      const originalFetch = window.fetch
      window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
        if (typeof input === 'string' && input.includes('/api/')) {
          init = init || {}
          init.headers = {
            ...init.headers,
            Authorization: auth.getAuthHeader,
          }
        }
        return originalFetch(input, init)
      }
    })
  }
})
