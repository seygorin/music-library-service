<template>
  <ClientOnly>
    <div class="auth-required">
      <h1>Authentication Required</h1>
      <p>Please log in to access this content</p>
      <div class="actions">
        <NuxtLink to="/login" class="button primary">Login</NuxtLink>
        <NuxtLink to="/register" class="button secondary">Register</NuxtLink>
      </div>
    </div>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.auth-required {
  text-align: center;
  padding: 2rem;
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}
</style>
