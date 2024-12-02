<template>
  <NuxtLink :to="`/tracks/${album.id}`" class="album-card">
    <div class="album-header">
      <h4>{{ album.name }}</h4>
      <div class="actions">
        <button @click.stop="toggleFavorite" class="icon-button">
          {{ isFavorite ? '❤️' : '🤍' }}
        </button>
        <button @click.stop="showEditModal = true" class="icon-button">✏️</button>
        <button @click.stop="handleUpdate" class="icon-button">✅</button>
        <button @click.stop="handleDelete" class="icon-button">🗑️</button>
      </div>
    </div>
    <div class="album-info">
      <span class="year">{{ album.year }}</span>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Album } from '@/types'

const props = defineProps<{
  album: Album
}>()

const store = useMusicStore()
const showEditModal = ref(false)

const isFavorite = computed(() => store.favorites.albums.some((a) => a.id === props.album.id))

const toggleFavorite = async () => {
  try {
    if (isFavorite.value) {
      await store.removeFromFavorites('album', props.album.id)
    } else {
      await store.addToFavorites('album', props.album.id)
    }
  }
}

const handleDelete = async () => {
  if (confirm('Are you sure you want to delete this album?')) {
    await store.deleteAlbum(props.album.id)
  }
}

const handleUpdate = async (data: Partial<Album>) => {
  await store.updateAlbum(props.album.id, data)
  showEditModal.value = false
}
</script>

<style lang="scss" scoped>
.album-card {
  background: $background-secondary;
  border-radius: 8px;
  padding: $spacing-lg;
  margin: $spacing-md 0;
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
