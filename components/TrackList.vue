<template>
  <div class="track-list">
    <div class="list-header">
      <h3>Tracks</h3>
      <button @click="showCreateModal = true" class="button primary">
        Add Track
      </button>
    </div>

    <LoadingSpinner v-if="loading" />

    <template v-else>
      <div v-if="tracks.length" class="tracks-container">
        <TrackCard
          v-for="track in tracks"
          :key="track.id"
          :track="track"
        />
      </div>

      <div v-else class="empty-state">
        No tracks yet
      </div>
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
import type { Track } from '@/types'

const props = defineProps<{
  albumId: string
}>()

const store = useMusicStore()
const showCreateModal = ref(false)
const loading = ref(false)

const tracks = computed(() => 
  store.getTracksByAlbumId(props.albumId)
)

const handleCreateTrack = async (data: Omit<Track, 'id'>) => {
  try {
    loading.value = true
    await store.createTrack({
      ...data,
      albumId: props.albumId
    })
    showCreateModal.value = false
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (!store.tracks.length) {
    store.fetchTracks()
  }
})
</script> 