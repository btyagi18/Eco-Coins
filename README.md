# Clean2Earn

Clean2Earn is a full-stack cleanup reward platform where users upload real before/after cleanup photos, verify them with Groq-powered AI, and earn rewards for approved cleanups.

## What This Project Does

- User signup and login with JWT auth
- Real camera-based cleanup upload flow
- GPS and timestamp capture with every submission
- Groq AI verification for before/after images
- Persistent dashboard with:
  - Rewards earned
  - verified cleanup count
  - impact score
  - daily mission progress
  - recent GPS activity
  - upload lock after 2 verified cleanups per day
- Real leaderboard based on actual users in the database
- Contact and Join Beta forms
- Mobile testing support through frontend devtunnels

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Framer Motion
- Backend: Node.js, Express, MongoDB, Mongoose
- Authentication: JWT, bcryptjs
- AI Verification: Groq API

## Folder Structure

```text
Clean2Earn/
  backend/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      services/
      utils/
    server.js
  frontend/
    src/
      components/
      context/
      hooks/
      lib/
      pages/
      services/
      utils/
```

## Backend Environment Variables

Create `backend/.env` like this:

```env
PORT=3001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=meta-llama/llama-4-scout-17b-16e-instruct
FRONTEND_URL=http://localhost:5173
```

## Run the Project

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:3001
```

## Mobile Testing

Use the frontend devtunnel URL while keeping both backend and frontend running on your laptop.

This project uses relative `/api` calls on the frontend, so Vite can proxy requests to the backend during development and mobile testing.

## Main User Flow

1. User signs up or logs in
2. User captures before and after cleanup photos
3. GPS metadata is attached
4. Backend sends both images to Groq for validation
5. If cleanup is verified:
   - coins increase
   - cleanup count increases
   - impact score increases
   - recent activity is saved
   - leaderboard updates
6. User can only earn from 2 verified cleanups per day

## Current Project Status

This project is complete as a strong MVP / showcase project.

It currently supports:

- working auth
- mobile-friendly testing
- persistent dashboard
- AI cleanup verification
- recent activity tracking
- real leaderboard
- daily upload limit

## Future Improvements

- reverse geocoding coordinates into human-readable place names
- deployed frontend and backend without depending on local devtunnels
- forgot-password flow
- automated tests
- admin moderation tools
- cleanup history page with filters
