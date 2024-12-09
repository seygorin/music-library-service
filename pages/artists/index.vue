<template>
  <div class="artists-page">
    <div class="header">
      <h1>Artists</h1>
      <button @click="showCreateModal = true" class="button primary">
        Add Artist
      </button>
    </div>

    <div class="artists-grid">
      <ArtistCard
        v-for="artist in store.artists"
        :key="artist.id"
        :artist="artist"
      />
    </div>

    <CreateArtistModal
      v-if="showCreateModal"
      @close="showCreateModal = false"
      @submit="handleCreate"
    />
  </div>
</template>

<script setup lang="ts">
import CreateArtistModal from '~/components/modals/CreateArtistModal.vue'
import type { Artist } from '@/types'
import { usePageMeta } from '~/composables/usePageMeta'

const store = useMusicStore()
const showCreateModal = ref(false)
const { setMeta } = usePageMeta()

setMeta(
  'Artists',
  'Browse and manage your favorite artists'
)

onMounted(() => {
  store.fetchArtists()
})

const handleCreate = async (data: Omit<Artist, 'id'>) => {
  await store.createArtist(data)
  showCreateModal.value = false
}
</script>

<style lang="scss" scoped>
.artists-page {
  padding: $spacing-xl;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $spacing-xl;
	border-radius: 8px;
}

.artists-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: $spacing-lg;
}
</style>
