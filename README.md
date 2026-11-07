# Trailmix

A small hiking trip planner: plan routes, drop waypoints, pack a gear list, share trips with friends.

- `api/` Express + Postgres service
- `web/` React + Vite frontend
- `db/` schema, row-level policies and seed data

## Run locally

```
docker compose up db
cd api && npm install && npm start
cd web && npm install && npm run dev
```

The API listens on port 4000 and the web app on 5173.
