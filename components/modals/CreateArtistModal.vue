<template>
  <BaseModal :title="isEdit ? 'Edit Artist' : 'Create Artist'" @close="handleClose">
    <form @submit.prevent="handleSubmit" class="form">
      <div class="form-group">
        <label for="name">Name</label>
        <input id="name" v-model="form.name" type="text" required placeholder="Artist name" />
      </div>

      <div class="form-group">
        <label class="checkbox-label">
          <input v-model="form.grammy" type="checkbox" />
          Grammy Winner
        </label>
      </div>

      <div class="form-actions">
        <button type="button" @click="handleClose" class="button secondary">Cancel</button>
        <button type="submit" class="button primary">
          {{ isEdit ? 'Update' : 'Create' }}
        </button>
      </div>
    </form>
  </BaseModal>
</template>

<script setup lang="ts">
import type { Artist } from '@/types'
import BaseModal from './BaseModal.vue'

const props = defineProps<{
  artist?: Artist
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', data: Omit<Artist, 'id'>): void
}>()

const isEdit = computed(() => !!props.artist)

const form = ref({
  name: props.artist?.name ?? '',
  grammy: props.artist?.grammy ?? false,
})

const handleClose = () => {
  console.log('CreateArtistModal: Closing modal')
  emit('close')
}

const handleSubmit = () => {
  emit('submit', {
    name: form.value.name,
    grammy: form.value.grammy,
  })
}
</script>
