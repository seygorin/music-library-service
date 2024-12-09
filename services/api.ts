const getBaseUrl = () => {
  const config = useRuntimeConfig()
  return config.public.apiBaseUrl
}

export const api = {
  async fetch(endpoint: string, options?: RequestInit) {
    const url = endpoint.startsWith('http') 
      ? endpoint 
      : `${getBaseUrl()}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`

    const response = await fetch(url, {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options?.headers,
      }
    })
    return response
  },

  // Artists
  async getArtists() {
    const response = await this.fetch('/artist')
    return this.handleResponse(response)
  },

  async getArtist(id: string) {
    const response = await this.fetch(`/artist/${id}`)
    return this.handleResponse(response)
  },

  async createArtist(data: Omit<Artist, 'id'>) {
    const response = await this.fetch('/artist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return this.handleResponse(response)
  },

  async updateArtist(id: string, data: Partial<Artist>) {
    const response = await this.fetch(`/artist/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return this.handleResponse(response)
  },

  async deleteArtist(id: string) {
    const response = await this.fetch(`/artist/${id}`, {
      method: 'DELETE',
    })
    return this.handleResponse(response)
  },

  // Albums
  async getAlbums() {
    const response = await this.fetch('/album')
    return this.handleResponse(response)
  },

  async getAlbum(id: string) {
    const response = await this.fetch(`/album/${id}`)
    return this.handleResponse(response)
  },

  async createAlbum(data: Omit<Album, 'id'>) {
    const response = await this.fetch('/album', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error('Failed to create album')
    }
    return response.json()
  },

  async updateAlbum(id: string, data: Partial<Album>) {
    const response = await this.fetch(`/album/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return this.handleResponse(response)
  },

  async deleteAlbum(id: string) {
    const response = await this.fetch(`/album/${id}`, {
      method: 'DELETE',
    })
    return this.handleResponse(response)
  },

  // Tracks
  async getTracks() {
    const response = await this.fetch('/track')
    return this.handleResponse(response)
  },

  async getTrack(id: string) {
    const response = await this.fetch(`/track/${id}`)
    return this.handleResponse(response)
  },

  async createTrack(data: Omit<Track, 'id'>) {
    const response = await this.fetch('/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return this.handleResponse(response)
  },

  async updateTrack(id: string, data: Partial<Track>) {
    const response = await this.fetch(`/track/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return this.handleResponse(response)
  },

  async deleteTrack(id: string) {
    const response = await this.fetch(`/track/${id}`, {
      method: 'DELETE',
    })
    return this.handleResponse(response)
  },

  // Favorites
  async getFavorites() {
    const response = await this.fetch('/favs')
    return this.handleResponse(response)
  },

  async addToFavorites(type: 'artist' | 'album' | 'track', id: string) {
    const response = await this.fetch(`/favs/${type}/${id}`, {
      method: 'POST',
    })
    return this.handleResponse(response)
  },

  async removeFromFavorites(type: 'artist' | 'album' | 'track', id: string) {
    const response = await this.fetch(`/favs/${type}/${id}`, {
      method: 'DELETE',
    })
    return this.handleResponse(response)
  },

  // Common response handler
  async handleResponse(response: Response) {
    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.message || `API request failed with status ${response.status}`)
    }

    const text = await response.text()
    return text ? JSON.parse(text) : null
  },
}
