<template>
  <div class="favorites-page">
    <h1>Favorites</h1>

    <LoadingSpinner v-if="store.loading" />

    <template v-else>
      <section v-if="store.favorites.artists.length" class="section">
        <h2>Favorite Artists</h2>
        <div class="grid">
          <ArtistCard v-for="artist in store.favorites.artists" :key="artist.id" :artist="artist" />
        </div>
      </section>

      <section v-if="store.favorites.albums.length" class="section">
        <h2>Favorite Albums</h2>
        <div class="grid">
          <AlbumCard v-for="album in store.favorites.albums" :key="album.id" :album="album" />
        </div>
      </section>

      <section v-if="store.favorites.tracks.length" class="section">
        <h2>Favorite Tracks</h2>
        <div class="tracks-list">
          <TrackCard v-for="track in store.favorites.tracks" :key="track.id" :track="track" />
        </div>
      </section>

      <div v-if="!hasFavorites" class="empty-state">
        <p>You haven't added any favorites yet</p>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
const store = useMusicStore()

const hasFavorites = computed(
  () =>
    store.favorites.artists.length > 0 ||
    store.favorites.albums.length > 0 ||
    store.favorites.tracks.length > 0
)

onMounted(() => {
  store.fetchFavorites()
})
</script>

<style lang="scss" scoped>
.favorites-page {
  padding: $spacing-xl 0;
}

.section {
  margin-bottom: $spacing-xl;

  h2 {
    margin-bottom: $spacing-lg;
    color: $primary-color;
  }
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: $spacing-lg;
}

.tracks-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.empty-state {
  text-align: center;
  padding: $spacing-xl;
  color: $text-secondary;
}
</style>
