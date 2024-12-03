<template>
  <BaseModal :title="isEdit ? 'Edit Album' : 'Create Album'">
    <form @submit.prevent="handleSubmit" class="form">
      <div class="form-group">
        <label for="name">Name</label>
        <input id="name" v-model="form.name" type="text" required placeholder="Album name" />
      </div>

      <div class="form-group">
        <label for="year">Year</label>
        <input id="year" v-model="form.year" type="number" required placeholder="Release year" />
      </div>

      <div class="form-actions">
        <button type="button" @click="$emit('close')" class="button secondary">Cancel</button>
        <button type="submit" class="button primary">
          {{ isEdit ? 'Update' : 'Create' }}
        </button>
      </div>
    </form>
  </BaseModal>
</template>

<script setup lang="ts">
import type { Album } from '@/types'
import BaseModal from './BaseModal.vue'

const props = defineProps<{
  album?: Album
  artistId?: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', data: Omit<Album, 'id'>): void
}>()

const isEdit = computed(() => !!props.album)

const form = ref({
  name: props.album?.name ?? '',
  year: props.album?.year ?? new Date().getFullYear(),
  artistId: props.album?.artistId ?? props.artistId ?? '',
})

const handleSubmit = () => {
  emit('submit', form.value)
}
</script>
