<template>
  <div>
    <AuthRequired v-if="error?.statusCode === 401" />
    <div v-else class="error-page">
      <h1>{{ error?.statusCode }}</h1>
      <p>{{ error?.message }}</p>
      <NuxtLink to="/" class="button">Return Home</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  error: Object,
})
</script>

<style lang="scss" scoped>
.error-page {
  text-align: center;
  padding: 2rem;
}
</style>
