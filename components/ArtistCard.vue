<template>
  <NuxtLink :to="`/albums/${artist.id}`" class="artist-card">
    <div class="artist-header">
      <h3>{{ artist.name }}</h3>
      <div class="actions">
        <button @click.stop="toggleFavorite" class="icon-button">
          {{ isFavorite ? '❤️' : '🤍' }}
        </button>
        <button @click.stop="handleEdit" class="icon-button">✏️</button>
        <button @click.stop="handleDelete" class="icon-button">🗑️</button>
      </div>
    </div>
    <div v-if="artist.grammy" class="grammy-badge">Grammy Winner 🏆</div>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
  artist: Artist
}>()

const store = useMusicStore()
const showEditModal = ref(false)
const isFavorite = computed(() => store.favorites.artists.some((a) => a.id === props.artist.id))

const toggleFavorite = async (e: Event) => {
  e.preventDefault()
  if (isFavorite.value) {
    await store.removeFromFavorites('artist', props.artist.id)
  } else {
    await store.addToFavorites('artist', props.artist.id)
  }
}

const handleEdit = (e: Event) => {
  e.preventDefault()
  showEditModal.value = true
}

const handleDelete = async (e: Event) => {
  e.preventDefault()
  if (confirm('Are you sure you want to delete this artist?')) {
    await store.deleteArtist(props.artist.id)
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
