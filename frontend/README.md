# Frontend Notes

## Purpose

This React app is the public face of Hay Reta. It keeps the original feel of an early learning project while now being easier to run and review.

## What Recruiters Should Notice

- React client split from the API
- Context-based auth flow
- Route-based navigation
- CRUD screens for users, teams and matches
- Mapbox integration for match locations

## Environment

Create `frontend/.env` with:

```bash
REACT_APP_API_URL=http://localhost:3000/
REACT_APP_MAPBOX_TOKEN=replace-me
```

## Commands

```bash
npm install
npm start
npm run build
```

## Deployment

- Best current target: Netlify
- Add the environment variable `REACT_APP_API_URL`
- Add the environment variable `REACT_APP_MAPBOX_TOKEN`
- The `_redirects` file is included so client-side routes work on refresh
