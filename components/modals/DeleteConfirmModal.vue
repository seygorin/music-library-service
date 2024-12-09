<template>
  <BaseModal :title="`Delete ${itemType}`" @close="handleClose">
    <form @submit.prevent="handleConfirm" class="form">
      <div class="form-group">
        <p>Are you sure you want to delete this {{ itemType }}?</p>
        <p class="warning-text">This action cannot be undone.</p>
      </div>

      <div class="form-actions">
        <button type="button" class="button secondary" @click="handleClose" :disabled="isLoading">
          Cancel
        </button>
        <button type="submit" class="button danger" :disabled="isLoading">
          {{ isLoading ? 'Deleting...' : 'Delete' }}
        </button>
      </div>
    </form>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from './BaseModal.vue'

const { itemType, isLoading = false } = defineProps<{
  itemType: string
  isLoading?: boolean
  show?: boolean
}>()

const emit = defineEmits<{
  (e: 'close' | 'confirm'): void
}>()

const handleClose = () => {
  emit('close')
}

const handleConfirm = () => {
  emit('confirm')
}
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
}

.warning-text {
  color: $danger-color;
  font-size: 0.9em;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: $spacing-md;
  margin-top: $spacing-lg;
}

.button.danger {
  background-color: $danger-color;
  color: white;

  &:hover {
    background-color: darken($danger-color, 10%);
  }

  &:disabled {
    background-color: lighten($danger-color, 20%);
    cursor: not-allowed;
  }
}
</style>
