<template>
  <div class="albums-page">
    <div class="header">
      <div class="title-section">
        <NuxtLink to="/artists" class="back-link">← Back to Artists</NuxtLink>
        <h1>{{ artist?.name }}'s Albums</h1>
      </div>
      <button @click="showCreateModal = true" class="button primary">Add Album</button>
    </div>

    <LoadingSpinner v-if="loading" />

    <template v-else>
      <div class="albums-grid">
        <AlbumCard v-for="album in artistAlbums" :key="album.id" :album="album" />
      </div>

      <div v-if="!artistAlbums.length" class="empty-state">No albums yet</div>
    </template>

    <CreateAlbumModal
      v-if="showCreateModal"
      :artist-id="artistId"
      @close="showCreateModal = false"
      @submit="handleCreateAlbum"
    />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const artistId = route.params.id as string
const store = useMusicStore()
const showCreateModal = ref(false)
const loading = ref(false)

const artist = computed(() => store.getArtistById(artistId))
const artistAlbums = computed(() => store.getAlbumsByArtistId(artistId))

const handleCreateAlbum = async (data: Omit<Album, 'id'>) => {
  try {
    loading.value = true
    await store.createAlbum({
      ...data,
      artistId,
    })
    showCreateModal.value = false
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  loading.value = true
  try {
    await Promise.all([store.fetchArtists(), store.fetchAlbums()])
  } finally {
    loading.value = false
  }
})
</script>

<style lang="scss" scoped>
.albums-page {
  padding: $spacing-xl;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $spacing-xl;
}

.title-section {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
}

.back-link {
  color: $text-secondary;
  text-decoration: none;

  &:hover {
    color: $primary-color;
  }
}

.albums-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: $spacing-lg;
}

.empty-state {
  text-align: center;
  padding: $spacing-xl;
  color: $text-secondary;
}
</style>
