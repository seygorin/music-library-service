<template>
  <div class="album-list">
    <div class="list-header">
      <h3>Albums</h3>
      <button @click="showCreateModal = true" class="button primary">Add Album</button>
    </div>

    <LoadingSpinner v-if="loading" />

    <template v-else>
      <div v-if="albums.length" class="albums-grid">
        <AlbumCard v-for="album in albums" :key="album.id" :album="album" />
      </div>

      <div v-else class="empty-state">No albums yet</div>
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
const props = defineProps<{
  artistId: string
}>()

const store = useMusicStore()
const showCreateModal = ref(false)
const loading = ref(false)

const albums = computed(() => store.getAlbumsByArtistId(props.artistId))

const handleCreateAlbum = async (data: Omit<Album, 'id'>) => {
  try {
    loading.value = true
    await store.createAlbum(data)
    showCreateModal.value = false
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (!store.albums.length) {
    store.fetchAlbums()
  }
})
</script>
