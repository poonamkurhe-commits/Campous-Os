# CampusOS - Smart Campus Management Platform

<div align="center">

![CampusOS](https://img.shields.io/badge/CampusOS-v1.0.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![FastAPI](https://img.shields.io/badge/FastAPI-Python-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)
![Production Ready](https://img.shields.io/badge/Production-Ready-success)

**Multi-tenant AI-powered campus management platform for colleges and universities**

[Quick Start](#quick-start) • [Features](#features) • [Documentation](#documentation) • [Deployment](#deployment)

</div>

---

## 📋 Overview

CampusOS is a comprehensive campus management system designed to streamline educational institution operations. Built with modern technologies, it provides dedicated portals for Students, Faculty, Parents, Wardens, College Admins, and Super Admins.

### ✨ Key Highlights

- 🎓 **6 Role-Based Portals** - Tailored experiences for each user type
- 🏢 **Multi-Tenant Architecture** - Manage multiple colleges from one platform
- 🔐 **Enterprise Security** - JWT authentication with auto-refresh
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile
- ♿ **WCAG AA Compliant** - Accessible to all users
- 🌙 **Dark Mode** - System-aware theme support
- 🚀 **Production Ready** - Comprehensive error handling and monitoring
- 📊 **Real-time Dashboard** - Live stats and analytics

---

## 🚀 Quick Start

### One-Command Setup

```bash
# Clone repository
git clone https://github.com/your-org/campusos.git
cd campusos

# Frontend setup
cd frontend && npm install && npm run dev

# Backend setup (new terminal)
cd backend && pip install -r requirements.txt && uvicorn app.main:app --reload
```

See [QUICK_START.md](./QUICK_START.md) for detailed setup instructions.

---

## 🎯 Features

### 🎓 Student Portal
- Personal dashboard with attendance & grades
- Assignment submission & tracking
- Timetable & class schedule
- Results & academic performance
- Digital notifications

### 👨‍🏫 Faculty Portal
- Teaching dashboard & analytics
- Attendance marking (bulk operations)
- Assignment creation & grading
- Result entry & management
- Student directory

### 👨‍👩‍👧 Parent Portal
- Children's academic monitoring
- Attendance tracking
- Results & performance reports
- Bus tracking (GPS integration ready)
- School communications

### 🏠 Warden Portal
- Hostel management dashboard
- Room allocation system
- Visitor check-in/out
- Complaint management
- Student attendance

### 🏛️ College Admin Portal
- College-wide analytics
- Faculty & student management
- Department administration
- Settings & configurations

### ⚡ Super Admin Portal
- Multi-tenant management
- College creation & administration
- System-wide configurations
- Platform analytics

---

## 🛠 Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State**: Zustand + React Query
- **Animations**: Framer Motion

### Backend
- **Framework**: FastAPI (Python 3.11+)
- **Database**: MongoDB with Beanie ODM
- **Auth**: JWT (Access + Refresh tokens)
- **Validation**: Pydantic v2

### Infrastructure
- **Frontend Hosting**: Vercel (recommended)
- **Backend Hosting**: Render / Railway / AWS
- **Database**: MongoDB Atlas
- **CDN**: Vercel Edge Network

---

## 📊 Project Statistics

| Metric | Count |
|--------|-------|
| **Total Pages** | 45+ |
| **API Endpoints** | 50+ |
| **Components** | 100+ |
| **Database Models** | 15+ |
| **Lines of Code** | 20,000+ |
| **User Roles** | 6 |
| **Portals** | 6 |

---

## 📚 Documentation

### Getting Started
- 📘 [Quick Start Guide](./QUICK_START.md) - Get up and running in 5 minutes
- 📗 [Project Summary](./PROJECT_SUMMARY.md) - Complete project overview
- 📙 [Deployment Guide](./DEPLOYMENT.md) - Production deployment instructions

### Portal Guides
- 🎓 [Student Portal](./STUDENT_PORTAL_SUMMARY.md)
- 👨‍🏫 [Faculty Portal](./FACULTY_PORTAL_SUMMARY.md)
- 👨‍👩‍👧 [Parent Portal](./PARENT_PORTAL_SUMMARY.md)
- 🏠 [Warden Portal](./WARDEN_PORTAL_SUMMARY.md)

### Technical Documentation
- 🔧 [Frontend README](./frontend/README.md)
- ✅ [Production Audit](./PRODUCTION_AUDIT_CHECKLIST.md)
- 🔐 [Security Guidelines](./DEPLOYMENT.md#security)
- 📈 [Performance Guide](./DEPLOYMENT.md#performance)

---

## 🚀 Deployment

### Frontend (Vercel)

```bash
cd frontend
npm run build
vercel --prod
```

### Backend (Render)

```bash
cd backend
pip install -r requirements.txt
# Configure environment variables
# Deploy via Render dashboard
```

### Environment Variables

**Frontend**:
```env
NEXT_PUBLIC_API_URL=https://your-api-url.com
NEXT_PUBLIC_APP_NAME=CampusOS
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

**Backend**:
```env
MONGODB_URL=mongodb+srv://...
SECRET_KEY=your-secret-key
CORS_ORIGINS=["https://your-domain.com"]
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment guide.

---

## 🔒 Security

- ✅ JWT Authentication (Access + Refresh tokens)
- ✅ Auto token refresh
- ✅ Role-based access control (RBAC)
- ✅ Secure password hashing (bcrypt)
- ✅ XSS & CSRF protection
- ✅ Security headers configured
- ✅ Input validation
- ✅ SQL injection prevention

---

## ♿ Accessibility

- ✅ WCAG AA Compliant
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ ARIA labels
- ✅ Focus management
- ✅ Color contrast compliance
- ✅ Skip to content link

---

## 📱 Responsive Design

- ✅ Mobile-first approach
- ✅ Tablet optimized
- ✅ Desktop layouts
- ✅ Touch-friendly UI
- ✅ Responsive navigation
- ✅ Adaptive components

---

## 🎨 Features

### Core Features
- ✅ Multi-tenant architecture
- ✅ Role-based dashboards
- ✅ Real-time notifications
- ✅ Attendance management
- ✅ Assignment system
- ✅ Result management
- ✅ Timetable system
- ✅ User management

### Technical Features
- ✅ Auto token refresh
- ✅ Session management
- ✅ Error boundaries
- ✅ Loading states
- ✅ Toast notifications
- ✅ CSV export
- ✅ Print support
- ✅ Dark mode
- ✅ PWA ready

---

## 📈 Performance

- ⚡ **Lighthouse Score**: 90+
- 📦 **Bundle Size**: ~250KB (gzipped)
- 🚀 **First Contentful Paint**: < 1.5s
- ⏱️ **Time to Interactive**: < 3.5s
- 💾 **React Query Caching**: 5 min stale time
- 🎯 **Code Splitting**: Automatic (Next.js)

---

## 🧪 Testing

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build verification
npm run build
```

---

## 📦 Project Structure

```
campusos/
├── frontend/              # Next.js application
│   ├── app/              # App router pages
│   ├── components/       # React components
│   ├── lib/              # Utilities
│   └── public/           # Static assets
│
├── backend/              # FastAPI application
│   ├── app/
│   │   ├── core/        # Core config
│   │   ├── models/      # Database models
│   │   ├── routers/     # API routes
│   │   └── schemas/     # Pydantic schemas
│   └── scripts/         # Utility scripts
│
└── docs/                # Documentation
```

---

## 🔄 Development Workflow

1. **Feature Development**
   ```bash
   git checkout -b feature/your-feature
   # Make changes
   npm run lint
   npm run type-check
   git commit -m "feat: your feature"
   git push origin feature/your-feature
   ```

2. **Code Review**
   - Create pull request
   - Run CI checks
   - Review and merge

3. **Deployment**
   - Merge to main
   - Auto-deploy to staging
   - Manual promote to production

---

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---

## 📄 License

Proprietary - All rights reserved

---

## 🆘 Support

### Documentation
- 📚 [Full Documentation](./docs/)
- 🚀 [Quick Start](./QUICK_START.md)
- 📖 [API Documentation](http://localhost:8000/docs)

### Troubleshooting
- Check [Common Issues](./QUICK_START.md#common-issues)
- Review deployment logs
- Verify environment variables
- Check database connection

---

## 🎉 Status

**Current Version**: 1.0.0  
**Status**: ✅ **Production Ready**  
**Last Updated**: 2026-07-29

### Deployment Status
- Frontend: ✅ Ready for Vercel
- Backend: ✅ Ready for Render
- Database: ✅ MongoDB Atlas compatible
- Documentation: ✅ Complete

---

## 🌟 Acknowledgments

Built with modern technologies:
- Next.js Team
- FastAPI Team
- shadcn/ui
- Vercel
- MongoDB Atlas

---

## 📞 Contact

For support or inquiries:
- Email: support@campusos.com
- Documentation: [docs/](./docs/)
- Issues: GitHub Issues

---

<div align="center">

**Made with ❤️ by the CampusOS Team**

[Documentation](./docs/) • [Deployment Guide](./DEPLOYMENT.md) • [Quick Start](./QUICK_START.md)

</div>
#   C a m p o u s - O s  
 