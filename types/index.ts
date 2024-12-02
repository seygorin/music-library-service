export interface Artist {
  id: string
  name: string
  grammy: boolean
}

export interface Album {
  id: string
  name: string
  year: number
  artistId: string | null
}

export interface Track {
  id: string
  name: string
  duration: number
  artistId: string | null
  albumId: string | null
}

export interface Favorites {
  artists: Artist[]
  albums: Album[]
  tracks: Track[]
} 