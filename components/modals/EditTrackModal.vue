<template>
  <BaseModal title="Edit Track">
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
        <button type="button" class="button secondary" @click="$emit('close')">Cancel</button>
        <button type="submit" class="button primary">Update</button>
      </div>
    </form>
  </BaseModal>
</template>

<script setup lang="ts">
import type { Track } from '@/types'
import BaseModal from './BaseModal.vue'

const props = defineProps<{
  track: Track
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', data: Partial<Track>): void
}>()

const form = ref({
  name: props.track.name,
  number: props.track.number,
  duration: props.track.duration,
})

const handleSubmit = () => {
  emit('submit', form.value)
}
</script>
