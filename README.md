# CampusOS — Multi-College AI-Powered Campus Platform

CampusOS is a multi-tenant Smart Campus Operating System. Multiple colleges share one platform with isolated data, role-based access, and per-college branding.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14, TypeScript, Tailwind, shadcn/ui, Framer Motion |
| Backend | FastAPI, Beanie ODM, JWT auth, RBAC |
| Database | MongoDB Atlas (or local MongoDB for dev) |
| File Storage | Cloudinary |
| Deploy | Vercel (frontend) + Render/Railway (backend) |

## Project Structure

```
CampusOS/
├── backend/          # FastAPI API
├── frontend/         # Next.js App Router
├── docker-compose.yml
└── README.md
```

## Quick Start (Local)

### Prerequisites

- Node.js 20+
- Python 3.12+
- MongoDB (local or Atlas)

### 1. Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate        # Windows
pip install -r requirements.txt
copy .env.example .env        # Edit with your MongoDB URI
python scripts/seed.py        # Create demo data
uvicorn app.main:app --reload --port 8000
```

API docs: http://localhost:8000/docs  
Health check: http://localhost:8000/health

### 2. Frontend

```bash
cd frontend
npm install
copy .env.example .env.local
npm run dev
```

App: http://localhost:3000

### 3. Docker (all services)

```bash
docker-compose up --build
```

## Demo Credentials

After running `python scripts/seed.py`:

| Role | Email | Password | Subdomain |
|------|-------|----------|-----------|
| Super Admin | admin@campusos.com | Admin@123 | (any) |
| College Admin | admin@demo.edu | Demo@123 | demo |
| Student | alice@demo.edu | Demo@123 | demo |
| Faculty | bob@demo.edu | Demo@123 | demo |

## Phase 1 Features (Implemented)

- JWT auth (login, register, refresh)
- Multi-tenant college model with `college_id` scoping
- Super Admin: college onboarding & management
- College Admin: dashboard, student/faculty lists
- Student/Faculty/Parent/Warden dashboard shells
- In-app notifications
- Per-college theme color (CSS variables)
- Role-based route guards (frontend + backend)

## Deployment

### Frontend → Vercel

1. Push repo to GitHub
2. Import `frontend/` in Vercel
3. Set environment variables:
   - `NEXT_PUBLIC_API_URL=https://your-backend.onrender.com`
   - `NEXT_PUBLIC_WS_URL=wss://your-backend.onrender.com`
4. Deploy

### Backend → Render

1. Create Web Service from `backend/` directory
2. Use Docker or native Python:
   - Build: `pip install -r requirements.txt`
   - Start: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
3. Set environment variables from `backend/.env.example`
4. Health check path: `/health`

### MongoDB Atlas

1. Create free M0 cluster
2. Add network access: `0.0.0.0/0` (or Render outbound IP)
3. Copy connection string to `MONGODB_URI`
4. Run seed script against Atlas: `python scripts/seed.py`

### CORS

Set `ALLOWED_ORIGINS` on backend to your Vercel URL:
```
ALLOWED_ORIGINS=https://your-app.vercel.app,http://localhost:3000
```

### Multi-college Subdomains

Use Cloudflare wildcard DNS (`*.campusos.com`) pointing to Vercel. Pass college context via `X-College-Subdomain` header (already implemented in API client).

## Deployment Checklist

- [ ] Frontend builds on Vercel (`npm run build`)
- [ ] Backend `/health` returns 200 on Render/Railway
- [ ] `NEXT_PUBLIC_API_URL` points to live backend
- [ ] MongoDB Atlas whitelisted for hosting IP
- [ ] CORS allows deployed frontend origin
- [ ] Seed script run on production DB
- [ ] Demo login works end-to-end on live URL

## Next Phases

- **Phase 2**: Timetable, QR attendance, notes, assignments, exams
- **Phase 3**: Bus tracking (WebSocket), hostel outpass, chat
- **Phase 4**: AI assistant (RAG), notes generator, risk model, study planner
- **Phase 5**: Face recognition, placement, events

## License

MIT
