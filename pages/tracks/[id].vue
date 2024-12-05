<template>
  <div class="tracks-page">
    <div class="header">
      <div class="title-section">
        <NuxtLink :to="`/albums/${album?.artistId}`" class="back-link">← Back to Albums</NuxtLink>
        <p class="subtitle">Album by {{ artist?.name }}</p>
        <h1>{{ album?.name }}</h1>
      </div>
      <button @click="showCreateModal = true" class="button primary">Add Track</button>
    </div>

    <LoadingSpinner v-if="loading" />

    <template v-else>
      <div v-if="albumTracks.length" class="tracks-grid">
        <TrackCard
          v-for="(track, index) in albumTracks"
          :key="track.id"
          :track="track"
          :index="index"
        />
      </div>

      <div v-else class="empty-state">No tracks yet</div>
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
import LoadingSpinner from '~/components/LoadingSpinner.vue'
import CreateTrackModal from '~/components/modals/CreateTrackModal.vue'
import type { Track } from '@/types'

const route = useRoute()
const albumId = route.params.id as string
const store = useMusicStore()
const showCreateModal = ref(false)
const loading = ref(false)

const album = computed(() => store.getAlbumById(albumId))
const artist = computed(() => store.getArtistById(album.value?.artistId || ''))
const albumTracks = computed(() => store.getTracksByAlbumId(albumId))

const handleCreateTrack = async (data: Omit<Track, 'id'>) => {
  try {
    loading.value = true
    await store.createTrack(data)
    showCreateModal.value = false
  } catch (error) {
    console.error('Failed to create track:', error)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  loading.value = true
  try {
    await Promise.all([store.fetchAlbums(), store.fetchTracks()])
  } finally {
    loading.value = false
  }
})
</script>

<style lang="scss" scoped>
.tracks-page {
  padding: $spacing-xl;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $spacing-xl;
	border-radius: 8px;
}

.title-section {
  display: flex;
  gap: $spacing-sm;
}

.back-link {
  color: $text-secondary;
  text-decoration: none;

  &:hover {
    color: $primary-color;
  }
}

.subtitle {
  color: $text-secondary;
}

.tracks-grid {
  display: grid;
  gap: $spacing-md;
}

.empty-state {
  text-align: center;
  padding: $spacing-xl;
  color: $text-secondary;
}
</style>
