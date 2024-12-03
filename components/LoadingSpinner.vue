<template>
  <div class="loading-spinner">
    <div class="spinner"></div>
  </div>
</template>

<style lang="scss" scoped>
.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: $spacing-xl;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid $background-secondary;
  border-top: 4px solid $primary-color;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style> 