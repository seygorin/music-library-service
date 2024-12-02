<template>
  <BaseModal :title="isEdit ? 'Edit Album' : 'Create Album'">
    <form @submit.prevent="handleSubmit" class="form">
      <div class="form-group">
        <label for="name">Name</label>
        <input id="name" v-model="form.name" type="text" required placeholder="Album name" />
      </div>

      <div class="form-group">
        <label for="year">Year</label>
        <input
          id="year"
          v-model.number="form.year"
          type="number"
          required
          min="1900"
          :max="currentYear"
        />
      </div>

      <div class="form-group">
        <label for="artist">Artist</label>
        <select id="artist" v-model="form.artistId" required>
          <option value="">Select Artist</option>
          <option v-for="artist in store.artists" :key="artist.id" :value="artist.id">
            {{ artist.name }}
          </option>
        </select>
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

const props = defineProps<{
  album?: Album
  artistId?: string
}>()

const store = useMusicStore()
const currentYear = new Date().getFullYear()

const form = ref({
  name: props.album?.name ?? '',
  year: props.album?.year ?? currentYear,
  artistId: props.album?.artistId ?? props.artistId ?? '',
})
</script>
