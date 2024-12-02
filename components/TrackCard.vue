<template>
  <div class="track-card">
    <div class="track-info">
      <span class="track-name">{{ track.name }}</span>
      <span class="duration">{{ formatDuration(track.duration) }}</span>
    </div>
    <div class="actions">
      <button @click="toggleFavorite" class="icon-button">
        {{ isFavorite ? '❤️' : '🤍' }}
      </button>
      <button @click="showEditModal = true" class="icon-button">✏️</button>
      <button @click="handleDelete" class="icon-button">🗑️</button>
    </div>

    <EditTrackModal
      v-if="showEditModal"
      :track="track"
      @close="showEditModal = false"
      @update="handleUpdate"
    />
  </div>
</template>

<script setup lang="ts">
import type { Track } from '@/types'

const props = defineProps<{
  track: Track
}>()

const store = useMusicStore()
const showEditModal = ref(false)

const isFavorite = computed(() => store.favorites.tracks.some((t) => t.id === props.track.id))

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

const handleUpdate = async (data: Partial<Track>) => {
  await store.updateTrack(props.track.id, data)
  showEditModal.value = false
}

const handleDelete = async () => {
  if (confirm('Are you sure you want to delete this track?')) {
    await store.deleteTrack(props.track.id)
  }
}
</script>
