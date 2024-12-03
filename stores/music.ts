import { defineStore } from 'pinia'
import { api } from '@/services/api'
import type { Artist, Album, Track, Favorites } from '@/types'

export const useMusicStore = defineStore('music', {
  state: () => ({
    artists: [] as Artist[],
    albums: [] as Album[],
    tracks: [] as Track[],
    favorites: {
      artists: [],
      albums: [],
      tracks: [],
    } as Favorites,
    loading: false,
    error: null as string | null,
  }),

  getters: {
    getArtistById: (state) => (id: string) => state.artists.find((artist) => artist.id === id),

    getAlbumById: (state) => (id: string) => state.albums.find((album) => album.id === id),

    getAlbumsByArtistId: (state) => (artistId: string) =>
      state.albums.filter((album) => album.artistId === artistId),

    getTracksByAlbumId: (state) => (albumId: string) =>
      state.tracks.filter((track) => track.albumId === albumId),
  },

  actions: {
    async fetchArtists() {
      try {
        this.loading = true
        this.artists = await api.getArtists()
      } catch (error) {
        this.error = 'Failed to fetch artists'
        throw error
      } finally {
        this.loading = false
      }
    },

    async createArtist(data: Omit<Artist, 'id'>) {
      try {
        const newArtist = await api.createArtist(data)
        this.artists.push(newArtist)
        return newArtist
      } catch (error) {
        this.error = 'Failed to create artist'
        throw error
      }
    },

    async updateArtist(id: string, data: Partial<Artist>) {
      try {
        const updatedArtist = await api.updateArtist(id, data)
        const index = this.artists.findIndex((a) => a.id === id)
        if (index !== -1) {
          this.artists[index] = updatedArtist
        }
        return updatedArtist
      } catch (error) {
        this.error = 'Failed to update artist'
        throw error
      }
    },

    async deleteArtist(id: string) {
      try {
        await api.deleteArtist(id)
        this.artists = this.artists.filter((a) => a.id !== id)
      } catch (error) {
        this.error = 'Failed to delete artist'
        throw error
      }
    },

    async fetchAlbums() {
      try {
        this.loading = true
        this.albums = await api.getAlbums()
      } catch (error) {
        this.error = 'Failed to fetch albums'
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchTracks() {
      try {
        this.loading = true
        this.tracks = await api.getTracks()
      } catch (error) {
        console.error('Failed to fetch tracks:', error)
        this.error = 'Failed to fetch tracks'
      } finally {
        this.loading = false
      }
    },

    async fetchFavorites() {
      try {
        this.loading = true
        this.favorites = await api.getFavorites()
      } catch (error) {
        this.error = 'Failed to fetch favorites'
        throw error
      } finally {
        this.loading = false
      }
    },

    async addToFavorites(type: 'artist' | 'album' | 'track', id: string) {
      try {
        await api.addToFavorites(type, id)
        await this.fetchFavorites()
      } catch (error) {
        this.error = `Failed to add ${type} to favorites`
        throw error
      }
    },

    async removeFromFavorites(type: 'artist' | 'album' | 'track', id: string) {
      try {
        await api.removeFromFavorites(type, id)
        await this.fetchFavorites()
      } catch (error) {
        this.error = `Failed to remove ${type} from favorites`
        throw error
      }
    },

    async createAlbum(data: Omit<Album, 'id'>) {
      try {
        const response = await api.createAlbum(data)
        this.albums.push(response)
      } catch (error) {
        console.error('Failed to create album:', error)
      }
    },

    async createTrack(data: Omit<Track, 'id'>) {
      try {
        const response = await api.createTrack(data)
        this.tracks.push(response)
        return response
      } catch (error) {
        console.error('Failed to create track:', error)
        throw error
      }
    },

    async updateTrack(id: string, data: Partial<Track>) {
      try {
        const response = await api.updateTrack(id, data)
        const index = this.tracks.findIndex((t) => t.id === id)
        if (index !== -1) {
          this.tracks[index] = response
        }
        return response
      } catch (error) {
        console.error('Failed to update track:', error)
        throw error
      }
    },

    async deleteTrack(id: string) {
      try {
        await api.deleteTrack(id)
        this.tracks = this.tracks.filter((t) => t.id !== id)
      } catch (error) {
        console.error('Failed to delete track:', error)
        throw error
      }
    },
  },
})
