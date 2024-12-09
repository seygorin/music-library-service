<template>
  <NuxtLink :to="`/albums/${artist.id}`" class="artist-card">
    <div class="artist-header">
      <h3>{{ artist.name }}</h3>
      <div class="actions">
        <button class="icon-button" @click.stop="toggleFavorite">
          {{ isFavorite ? '❤️' : '🤍' }}
        </button>
        <button
          class="icon-button"
          @click.stop.prevent="
            (e) => {
              e.preventDefault()
              showEditModal = true
            }
          "
        >
          ✏️
        </button>
        <button
          class="icon-button"
          @click.stop.prevent="
            (e) => {
              e.preventDefault()
              showDeleteModal = true
            }
          "
        >
          🗑️
        </button>
      </div>
    </div>
    <div v-if="artist.grammy" class="grammy-badge">Grammy Winner 🏆</div>

    <Teleport to="body">
      <CreateArtistModal
        v-if="showEditModal"
        :artist="artist"
        @close="showEditModal = false"
        @submit="handleUpdate"
      />

      <DeleteConfirmModal
        v-if="showDeleteModal"
        :show="showDeleteModal"
        item-type="artist"
        :is-loading="isDeleting"
        @close="showDeleteModal = false"
        @confirm="handleDelete"
      />
    </Teleport>
  </NuxtLink>
</template>

<script setup lang="ts">
import { useToast } from 'vue-toastification'
import type { Artist } from '@/types'
import CreateArtistModal from '~/components/modals/CreateArtistModal.vue'
import DeleteConfirmModal from '~/components/modals/DeleteConfirmModal.vue'

const props = defineProps<{
  artist: Artist
}>()

const store = useMusicStore()
const toast = useToast()
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const isDeleting = ref(false)

const isFavorite = computed(() => store.favorites.artists.some((a) => a.id === props.artist.id))

const toggleFavorite = async (e: Event) => {
  e.preventDefault()
  try {
    if (isFavorite.value) {
      await store.removeFromFavorites('artist', props.artist.id)
    } else {
      await store.addToFavorites('artist', props.artist.id)
    }
  } catch (error) {
    toast.error(`Failed to update favorites: ${error}`)
  }
}

const handleDelete = async () => {
  try {
    isDeleting.value = true
    await store.deleteArtist(props.artist.id)
    toast.success('Artist deleted successfully')
  } catch (error) {
    toast.error(`Failed to delete artist: ${error}`)
  } finally {
    isDeleting.value = false
    showDeleteModal.value = false
  }
}

const handleUpdate = async (data: Partial<Artist>) => {
  try {
    await store.updateArtist(props.artist.id, data)
    showEditModal.value = false
    toast.success('Artist updated successfully')
  } catch (error) {
    toast.error(`Failed to update artist: ${error}`)
  }
}
</script>

<style lang="scss" scoped>
.artist-card {
  display: block;
  text-decoration: none;
  color: inherit;
  background: $background-secondary;
  border-radius: 8px;
  padding: $spacing-lg;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
}

.artist-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $spacing-md;
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

.grammy-badge {
  display: inline-block;
  background: $primary-color;
  color: white;
  padding: $spacing-xs $spacing-sm;
  border-radius: 4px;
  font-size: 0.9em;
}
</style>
