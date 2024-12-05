<template>
  <BaseModal :title="isEdit ? 'Edit Track' : 'Create Track'" @close="handleClose">
    <form class="form" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input id="name" v-model="form.name" type="text" required placeholder="Track name" />
      </div>

      <div class="form-group">
        <label for="duration">Duration (seconds)</label>
        <input
          id="duration"
          v-model.number="form.duration"
          type="number"
          required
          min="1"
          placeholder="Duration in seconds"
        />
      </div>

      <div class="form-actions">
        <button type="button" class="button secondary" @click="handleClose">Cancel</button>
        <button type="submit" class="button primary">
          {{ isEdit ? 'Update' : 'Create' }}
        </button>
      </div>
    </form>
  </BaseModal>
</template>

<script setup lang="ts">
import type { Track } from '@/types'
import BaseModal from './BaseModal.vue'

const props = defineProps<{
  track?: Track
  albumId: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', data: Omit<Track, 'id'>): void
}>()

const isEdit = computed(() => !!props.track)

const form = ref({
  name: props.track?.name ?? '',
  number: props.track?.number ?? 1,
  duration: props.track?.duration ?? 0,
  albumId: props.track?.albumId ?? props.albumId,
})

const handleClose = () => {
  console.log('CreateTrackModal: Closing modal')
  emit('close')
}

const handleSubmit = () => {
  emit('submit', form.value)
}
</script>
