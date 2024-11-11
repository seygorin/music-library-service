import { defineStore } from 'pinia'

interface User {
  id: number
  email: string
  name: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null as User | null,
  }),
  actions: {
    setUser(user: User) {
      this.user = user
      this.isAuthenticated = true
    },
    logout() {
      this.user = null
      this.isAuthenticated = false
    },
  },
})
