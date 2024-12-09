<template>
  <NuxtLink :to="`/tracks/${album.id}`" class="album-card">
    <div class="album-header">
      <h4>{{ album.name }}</h4>
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
    <div class="album-info">
      <span class="year">{{ album.year }}</span>
    </div>

    <Teleport to="body">
      <CreateAlbumModal
        v-if="showEditModal"
        :album="album"
        @close="showEditModal = false"
        @submit="handleUpdate"
      />

      <DeleteConfirmModal
        v-if="showDeleteModal"
        :show="showDeleteModal"
        item-type="album"
        :is-loading="isDeleting"
        @close="showDeleteModal = false"
        @confirm="handleDelete"
      />
    </Teleport>
  </NuxtLink>
</template>

<script setup lang="ts">
import { useToast } from 'vue-toastification'
import type { Album } from '@/types'
import CreateAlbumModal from '~/components/modals/CreateAlbumModal.vue'
import DeleteConfirmModal from '~/components/modals/DeleteConfirmModal.vue'

const props = defineProps<{
  album: Album
}>()

const store = useMusicStore()
const toast = useToast()
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const isDeleting = ref(false)

const isFavorite = computed(() => store.favorites.albums.some((a) => a.id === props.album.id))

const toggleFavorite = async (e: Event) => {
  e.preventDefault()
  try {
    if (isFavorite.value) {
      await store.removeFromFavorites('album', props.album.id)
    } else {
      await store.addToFavorites('album', props.album.id)
    }
  } catch (error) {
    toast.error(`Failed to update favorites: ${error}`)
  }
}

const handleDelete = async () => {
  try {
    isDeleting.value = true
    await store.deleteAlbum(props.album.id)
    toast.success('Album deleted successfully')
  } catch (error) {
    toast.error(`Failed to delete album: ${error}`)
  } finally {
    isDeleting.value = false
    showDeleteModal.value = false
  }
}

const handleUpdate = async (data: Partial<Album>) => {
  try {
    await store.updateAlbum(props.album.id, data)
    showEditModal.value = false
    toast.success('Album updated successfully')
  } catch (error) {
    toast.error(`Failed to update album: ${error}`)
  }
}
</script>

<style lang="scss" scoped>
.album-card {
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

.album-header {
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

.year {
  color: $text-secondary;
  font-size: 0.9em;
}
</style>
