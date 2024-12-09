# Music Library Application

A modern web application for managing your music collection. Browse artists, albums, and tracks, create playlists, and manage your favorites.

## Live Demo

Visit the application at: [https://music-library-service.vercel.app](https://music-library-service.vercel.app)

## Features

- Browse and manage artists, albums, and tracks
- Create and manage playlists
- Add items to favorites
- User authentication
- Responsive design
- 3D visualization effects

## Frontend Setup

1. Clone the repository:

```bash
git clone <https://github.com/seygorin/music-library-service.git>
cd <music-library-service>
```

2. Install dependencies:

```bash
npm install
```

3. Create .env files:

```env:.env.development
NUXT_API_BASE_URL=/api
```

```env:.env.production
NUXT_API_BASE_URL=http://localhost:4000
```

4. Start development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## Backend Setup

The application requires a backend server running. Follow these steps to set it up:

1. Clone the backend repository:
```bash
git clone https://github.com/seygorin/nodejs2024Q3-service
cd nodejs2024Q3-service
```

2. Using Docker (Recommended):
```bash
npm run docker:build  # Build containers
npm run docker:up     # Start containers
```

The backend API will be available at `http://localhost:4000`

### Backend Services
- API: http://localhost:4000
- Swagger UI: http://localhost:4000/api
- Prisma Studio: http://localhost:5555

### Backend Management
View logs:
```bash
npm run docker:logs
```

Stop services:
```bash
npm run docker:down
```

## Production Deployment

Build the frontend for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Technologies Used

### Frontend
- Nuxt.js 3
- Vue.js 3
- TypeScript
- Three.js for 3D effects
- Pinia for state management
- Vue Toastification for notifications

### Backend
- Node.js
- NestJS
- PostgreSQL
- Prisma
- Docker

## API Documentation

Backend API documentation is available at:
- Swagger UI: http://localhost:4000/api
- OpenAPI specification: Available in backend's `/doc` folder
