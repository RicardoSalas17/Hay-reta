# Backend Notes

## Purpose

This Express API powers auth, teams, matches and comments for Hay Reta.

## What Recruiters Should Notice

- Session-based authentication with Passport
- Mongoose models with references between users, teams, matches and comments
- Cloudinary upload integration
- Simple controller and route split that reflects an early full stack learning project

## Main Endpoints

- `POST /signup`
- `POST /login`
- `GET /profile`
- `GET /teams`
- `POST /teams`
- `GET /matchs`
- `POST /matchs`
- `POST /comments/:id`

## Environment

Create `backend/.env` with:

```bash
PORT=3000
DB=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/hay-reta?retryWrites=true&w=majority
SECRET=replace-me
CORS_ORIGINS=http://localhost:3000,http://localhost:3001,https://your-netlify-site.netlify.app
CLOUDINARY_NAME=...
CLOUDINARY_KEY=...
CLOUDINARY_SECRET=...
```

The MongoDB connection string must include the database name, for example `/hay-reta` before the query string.

## Commands

```bash
npm install
npm run dev
npm start
```

## Deployment

- Best current target: Koyeb or Render
- Keep MongoDB in Atlas and images in Cloudinary
- If frontend and backend are on different domains, `CORS_ORIGINS` must include the frontend URL
