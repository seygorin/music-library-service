<template>
  <div class="tracks-page">
    <div class="header">
      <div class="title-section">
        <NuxtLink :to="`/albums/${album?.artistId}`" class="back-link"> ← Back to Albums </NuxtLink>
        <h1>{{ album?.name }}</h1>
        <p class="subtitle">Album by {{ artist?.name }}</p>
      </div>
      <button @click="showCreateModal = true" class="button primary">Add Track</button>
    </div>

    <LoadingSpinner v-if="loading" />

    <template v-else>
      <div class="tracks-list">
        <TrackCard v-for="track in albumTracks" :key="track.id" :track="track" />
      </div>

      <div v-if="!albumTracks.length" class="empty-state">No tracks yet</div>
    </template>

    <CreateTrackModal
      v-if="showCreateModal"
      :album-id="albumId"
      @close="showCreateModal = false"
      @submit="handleCreateTrack"
    />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const albumId = route.params.id as string
const store = useMusicStore()
const showCreateModal = ref(false)
const loading = ref(false)

const album = computed(() => store.getAlbumById(albumId))
const artist = computed(() => store.getArtistById(album.value?.artistId || ''))
const albumTracks = computed(() => store.getTracksByAlbumId(albumId))

onMounted(async () => {
  loading.value = true
  try {
    await Promise.all([store.fetchAlbums(), store.fetchTracks()])
  } finally {
    loading.value = false
  }
})
</script>
