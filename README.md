# Hay Reta

Hay Reta is an early full stack project I built while I was learning web development. Instead of rewriting it from scratch, I decided to preserve its original scope and improve the parts that make it easier to review, run and deploy today.

Live frontend: `https://hay-reta-rs17-ironhackproject.netlify.app/`

## For Recruiters

- This repository intentionally keeps the spirit of an early project: class components, simple CRUD flows and direct naming choices from my learning stage.
- The code now includes targeted fixes for stability, deploy configuration and documentation, without hiding that it started as a junior project.
- It demonstrates hands-on work with authentication, image uploads, maps, relational MongoDB modeling and a deployed frontend/backend split.

## What The App Does

- Sign up and log in users
- Create teams
- Create matches
- Comment on matches
- Upload images with Cloudinary
- Show locations with Leaflet and Geoapify

## Tech Stack

- Frontend: React 16, React Router, Ant Design, Axios
- Backend: Express, Mongoose, Passport, Express Session
- Services: MongoDB Atlas, Cloudinary, Geoapify, Netlify

## What Was Improved In This Pass

- Fixed deploy-specific hardcoded URLs by moving the API base URL to environment variables
- Updated backend CORS handling so modern deployments can be configured without editing code
- Fixed several controller and component bugs that could cause broken endpoints or render loops
- Protected write operations behind authentication checks
- Added recruiter-friendly documentation and deployment notes

## Project Structure

```text
frontend/  React client
backend/   Express API
```

## Run Locally

## 1. Backend

```bash
cd backend
npm install
npm run dev
```

Create `backend/.env` from `backend/.env.example`.

## 2. Frontend

```bash
cd frontend
npm install
npm start
```

Create `frontend/.env` from `frontend/.env.example`.

## Environment Variables

### Frontend

```bash
REACT_APP_API_URL=http://localhost:3000/
REACT_APP_GEOAPIFY_KEY=replace-me
```

### Backend

```bash
PORT=3000
DB=mongodb+srv://...
SECRET=replace-me
CORS_ORIGINS=http://localhost:3000,http://localhost:3001,https://your-netlify-site.netlify.app
CLOUDINARY_NAME=...
CLOUDINARY_KEY=...
CLOUDINARY_SECRET=...
```

## Free Hosting Options For The Backend

## Recommended: Render

- Keeps the current Express server model
- Works well with MongoDB Atlas and Cloudinary
- Good fit if you want minimal code changes

## Other Viable Options

- Railway: easy to use, but often limited by usage credits

## Suggested Production Setup

- Frontend: Netlify
- Backend: Render
- Database: MongoDB Atlas free tier
- Images: Cloudinary free tier

## Notes About This Project

- Some naming and structure choices are intentionally kept close to the original project.
- The goal is not to disguise it as a senior-level greenfield app.
- The goal is to show growth: an early project that now has better stability, deployability and documentation.

## More Details

- `frontend/README.md`
- `backend/README.md`
