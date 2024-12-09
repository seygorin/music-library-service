<template>
  <div class="layout">
    <header class="header">
      <nav class="nav container">
        <NuxtLink to="/" class="logo">Music Library</NuxtLink>
        <div class="nav-links">
          <template v-if="auth.isAuthenticated">
            <NuxtLink to="/favorites" class="favorites-button">❤️</NuxtLink>
            <span class="user-name">{{ auth.user?.login }}</span>
            <button class="button primary" @click="handleLogout">Logout</button>
          </template>
          <template v-else>
            <NuxtLink to="/login" class="button primary">Login</NuxtLink>
          </template>
        </div>
      </nav>
    </header>

    <main class="main container">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useToast } from 'vue-toastification'

const auth = useAuthStore()
const router = useRouter()
const toast = import.meta.client ? useToast() : null

const handleLogout = () => {
  auth.logout()
  router.push('/login')
  if (import.meta.client) {
    toast?.success('Logged out successfully')
  }
}
</script>

<style lang="scss">
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  width: 100%;
}

.header {
  background-color: $background-secondary;
  padding: $spacing-md;
  width: 100%;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  color: $primary-color;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: $spacing-md;
  align-items: center;
}

.user-name {
  color: $text-secondary;
  margin-right: $spacing-sm;
}

.favorites-button {
	text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
}
</style>
