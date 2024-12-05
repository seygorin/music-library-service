<template>
  <div class="home">
    <h1 class="title">Welcome to Music Library</h1>
    <p class="description">Discover and manage your favorite music</p>

    <div>
      <NuxtLink to="/artists" class="explore-button">
        <span class="button-content">
          <span class="icon">🎵</span>
          Explore Music Collection
        </span>
        <span class="arrow">→</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.home {
  text-align: center;
  padding: $spacing-xl 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-xl;
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
  margin-bottom: $spacing-xl;
}

.explore-button {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  padding: $spacing-lg $spacing-xl;
  background: $primary-color;
  color: $text-primary;
  text-decoration: none;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: $primary-color, 10%;
  }
}

.button-content {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
}

.icon {
  font-size: 1.5rem;
}

.arrow {
  font-size: 1.2rem;
}
</style>
