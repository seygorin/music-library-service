import { defineStore } from 'pinia'

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  user: {
    userId: string
    login: string
  } | null
  loading: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    accessToken: null,
    refreshToken: null,
    user: null,
    loading: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.accessToken,
    getAuthHeader: (state) => (state.accessToken ? `Bearer ${state.accessToken}` : null),
  },

  actions: {
    async login(credentials: { login: string; password: string }) {
      try {
        this.loading = true
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials),
        })

        if (!response.ok) throw new Error('Login failed')

        const data = await response.json()
        this.accessToken = data.accessToken
        this.refreshToken = data.refreshToken

        const payload = JSON.parse(atob(data.accessToken.split('.')[1]))
        this.user = {
          userId: payload.userId,
          login: payload.login,
        }
      } finally {
        this.loading = false
      }
    },

    async register(userData: { login: string; password: string }) {
      try {
        this.loading = true
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        })

        if (!response.ok) throw new Error('Registration failed')
        return response.json()
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.accessToken = null
      this.refreshToken = null
      this.user = null
    },
  },
})
