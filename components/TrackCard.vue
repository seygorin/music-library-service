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
      <button class="icon-button" @click="showDeleteModal = true">🗑️</button>
    </div>

    <Teleport to="body">
      <CreateTrackModal
        v-if="showEditModal"
        :track="track"
        :album-id="track.albumId"
        @close="showEditModal = false"
        @submit="handleUpdate"
      />

      <DeleteConfirmModal
        v-if="showDeleteModal"
        :show="showDeleteModal"
        item-type="track"
        :is-loading="isDeleting"
        @close="showDeleteModal = false"
        @confirm="handleDelete"
      />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { useToast } from 'vue-toastification'
import type { Track } from '@/types'
import CreateTrackModal from '~/components/modals/CreateTrackModal.vue'
import DeleteConfirmModal from '~/components/modals/DeleteConfirmModal.vue'

const props = defineProps<{
  track: Track
  index: number
}>()

const store = useMusicStore()
const toast = useToast()
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const isDeleting = ref(false)

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
    toast.error(`Failed to update favorites: ${error}`)
  }
}

const handleUpdate = async (data: Partial<Track>) => {
  try {
    await store.updateTrack(props.track.id, data)
    showEditModal.value = false
    toast.success('Track updated successfully')
  } catch (error) {
    toast.error(`Failed to update track: ${error}`)
  }
}

const handleDelete = async () => {
  try {
    isDeleting.value = true
    await store.deleteTrack(props.track.id)
    toast.success('Track deleted successfully')
  } catch (error) {
    toast.error(`Failed to delete track: ${error}`)
  } finally {
    isDeleting.value = false
    showDeleteModal.value = false
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
