<template>
  <div class="layout">
    <header class="header">
      <nav class="nav">
        <NuxtLink to="/" class="logo">Music Library</NuxtLink>
        <div class="nav-links">
          <template v-if="auth.isAuthenticated">
            <span class="user-name">{{ auth.user?.name }}</span>
            <button @click="handleLogout" class="nav-button">Logout</button>
          </template>
          <template v-else>
            <NuxtLink to="/login" class="nav-link">Login</NuxtLink>
          </template>
        </div>
      </nav>
    </header>

    <main class="main">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const auth = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  auth.logout()
  router.push('/login')
}
</script>

<style lang="scss">
@use '@/assets/styles/main.scss' as *;

.layout {
  @extend .container;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: $background-secondary;
  padding: $spacing-md 0;
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
}

.nav-link {
  color: $text-primary;
  text-decoration: none;

  &:hover {
    color: $primary-color;
  }
}

.main {
  flex: 1;
  padding: $spacing-xl 0;
}

.user-name {
  color: $text-secondary;
}

.nav-button {
  background: none;
  border: none;
  color: $text-primary;
  cursor: pointer;
  padding: $spacing-sm $spacing-md;

  &:hover {
    color: $primary-color;
  }
}
</style>
