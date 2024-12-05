<template>
  <div class="track-card">
    <div class="track-info">
      <span class="track-number">{{ index + 1 }}.</span>
      <span class="track-name">{{ track.name }}</span>
      <span class="track-duration">{{ formatDuration(track.duration) }}</span>
    </div>
    <div class="actions">
      <button class="icon-button" @click="toggleFavorite">
        {{ isFavorite ? '❤️' : '🤍' }}
      </button>
      <button class="icon-button" @click="showEditModal = true">✏️</button>
      <button class="icon-button" @click="handleDelete">🗑️</button>
    </div>

    <EditTrackModal
      v-if="showEditModal"
      :track="track"
      @close="showEditModal = false"
      @submit="handleUpdate"
    />
  </div>
</template>

<script setup lang="ts">
import type { Track } from '@/types'
import EditTrackModal from '~/components/modals/EditTrackModal.vue'

const props = defineProps<{
  track: Track
  index: number
}>()

const store = useMusicStore()
const showEditModal = ref(false)

const isFavorite = computed(() => store.favorites.tracks.some((t) => t.id === props.track.id))

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

const toggleFavorite = async () => {
  try {
    if (isFavorite.value) {
      await store.removeFromFavorites('track', props.track.id)
    } else {
      await store.addToFavorites('track', props.track.id)
    }
  } catch (error) {
    console.error('Failed to toggle favorite:', error)
  }
}

const handleUpdate = async (data: Partial<Track>) => {
  try {
    await store.updateTrack(props.track.id, data)
    showEditModal.value = false
  } catch (error) {
    console.error('Failed to update track:', error)
  }
}

const handleDelete = async () => {
  if (confirm('Are you sure you want to delete this track?')) {
    try {
      await store.deleteTrack(props.track.id)
    } catch (error) {
      console.error('Failed to delete track:', error)
    }
  }
}
</script>

<style lang="scss" scoped>
.track-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $spacing-md;
  background: $background-secondary;
  margin-bottom: $spacing-sm;
  transition: transform 0.2s;
	border-radius: 8px;

  &:hover {
    transform: translateY(-2px);
  }
}

.track-info {
  display: flex;
  align-items: center;
  gap: $spacing-md;
}

.track-number {
  color: $text-secondary;
  min-width: 2em;
}

.track-duration {
  color: $text-secondary;
}

.actions {
  display: flex;
  gap: $spacing-sm;
}

.icon-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: $spacing-xs;

  &:hover {
    opacity: 0.8;
  }
}
</style>
