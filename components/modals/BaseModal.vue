<template>
  <div class="modal-overlay" @click="$emit('close')">
    <div class="modal" @click.stop>
      <div class="modal-header">
        <h3 class="modal-title">{{ title }}</h3>
        <button class="close-button" @click="$emit('close')">&times;</button>
      </div>
      <div class="modal-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()

defineEmits<{
  (e: 'close'): void
}>()
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: $background-primary;
  border-radius: 8px;
  padding: $spacing-lg;
  min-width: 300px;
  max-width: 500px;
  width: 90%;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $spacing-lg;
}

.modal-title {
  margin: 0;
  color: $text-primary;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: $text-secondary;
  padding: $spacing-xs;

  &:hover {
    color: $text-primary;
  }
}

.modal-content {
  color: $text-primary;
}
</style>
