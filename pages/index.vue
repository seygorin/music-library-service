<template>
  <div class="home">
    <h1 class="title">Welcome to Music Library</h1>
    <p class="description">Discover and manage your favorite music</p>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.home {
  text-align: center;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: $spacing-lg;
  color: $primary-color;
}

.description {
  font-size: 1.2rem;
  color: $text-secondary;
}
</style>
