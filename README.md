# Quiz_last
Quizz Blast is a live trivia game where hosts create multiple-choice quizzes and players join instantly via code or link. Competing in real time, participants earn points for accuracy and speed, with leaderboards boosting excitement. Perfect for classrooms, training, or parties, it blends fun, learning, and teamwork.

## Starter scaffold added

I scaffolded a starter monorepo with a minimal backend and frontend to begin development.

- Backend: `/backend` — Express + TypeScript + Socket.IO starter (auth routes, health check)
- Frontend: `/frontend` — Next.js + TypeScript + Tailwind starter (basic home page)
- Docker Compose: `docker-compose.yml` — services for backend, frontend, Postgres and Redis

Quick start (requires Docker):

```bash
docker compose up --build
```

Then open http://localhost:3000 for the frontend and http://localhost:4000/api/health for backend health.

Next steps: implement role-based auth, database integration, real-time game flow, dashboards.

