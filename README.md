# EduShare Frontend

A modern React frontend for EduShare, a GTU-focused academic resource platform where students can discover branch-wise study material, upload contributions, and generate AI-assisted study plans.

EduShare is built as a responsive single-page application with role-based flows for students and admins, plus a personalized dashboard and moderation tools.

## What This Project Includes

- Branch -> semester -> subject navigation for GTU engineering students
- Material discovery by category (syllabus, PYQs, notes, playlists, solutions, books)
- Material upload flow with PDF/link support and client-side validation
- Authentication (signup/login/logout) with persisted token state
- Role-aware access control (user dashboard + admin-only panel)
- Admin moderation queue (approve/reject submissions)
- AI Study Guide flow for generating personalized exam prep plans
- In-app PDF rendering and preview using PDF.js
- Animated UI using Framer Motion and utility-first styling with Tailwind CSS v4

## Tech Stack

- React 19
- Vite 7
- React Router 7
- Tailwind CSS 4 (+ @tailwindcss/vite)
- Framer Motion
- PDF.js (pdfjs-dist)
- ESLint 9

## Key User Flows

### 1) Student Discovery Flow

1. Open home page
2. Choose branch
3. Choose semester
4. Choose subject
5. Open category modal and access materials

### 2) Contribution Flow

1. Login/signup
2. Open upload page
3. Add metadata (branch, semester, subject, category)
4. Upload PDF or add external link
5. Submit for admin moderation

### 3) Admin Moderation Flow

1. Login as admin user
2. Open admin panel
3. Review pending materials
4. Preview content (PDF/link)
5. Approve or reject

### 4) AI Study Plan Flow

1. Open AI Study Guide page
2. Provide subject, chapters, prep window, and exam objective
3. Upload syllabus PDF (notes PDF optional)
4. Add YouTube playlist URL
5. Generate personalized plan via backend API

## Routing Overview

- / -> Home
- /dashboard -> Protected user dashboard
- /branch/:branchName -> Branch page
- /branch/:branchName/semester/:semId -> Semester page
- /branch/:branchName/semester/:semId/subject/:subjectName -> Subject page
- /study-guide -> AI Study Guide
- /upload -> Material upload page
- /login -> Login
- /signup -> Signup
- /admin -> Protected admin console

## Authentication and Authorization

- Token-based auth is stored in localStorage
- App bootstraps session by calling /api/auth/me when token exists
- Protected routes:
  - /dashboard requires authenticated user
  - /admin requires authenticated admin role
- Non-admin users attempting /admin are redirected to home

## API Integration

The frontend uses a centralized API helper in src/lib/api.js.

Main endpoint groups:

- Auth
  - POST /api/auth/signup
  - POST /api/auth/login
  - GET /api/auth/me
  - GET /api/auth/dashboard
- Materials
  - GET /api/materials
  - POST /api/materials
- Admin
  - GET /api/admin/materials?status=
  - PATCH /api/admin/materials/:materialId/approve
  - PATCH /api/admin/materials/:materialId/reject
- Study Guide
  - POST /api/study-guide/generate-plan
  - POST /api/study-guide/chat
  - POST /api/study-guide/chapter-guidance
  - POST /api/study-guide/answer-question
  - GET /api/study-guide/my-plans
  - GET /api/study-guide/plan/:planId
  - PATCH /api/study-guide/plan/:planId/status

## Environment Variables

Create a .env file in the project root:

```env
VITE_API_BASE_URL=http://localhost:4000
```

Notes:

- VITE_API_BASE_URL should point to your backend origin (no trailing slash required)
- Current fallback in code is http://localhost:4000
- Existing local setup may already point to a deployed backend URL

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: latest LTS)
- npm 9+

### Installation

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Vite will print the local URL (usually http://localhost:5173).

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Available Scripts

- npm run dev -> Start Vite dev server
- npm run build -> Create production build in dist
- npm run preview -> Preview production build locally
- npm run lint -> Run ESLint checks

## Project Structure

```text
frontend-of-edushare/
├─ public/                        # Static assets served as-is
├─ src/
│  ├─ assets/                     # App images/icons/fonts (if added)
│  ├─ components/                 # Reusable UI building blocks
│  │  ├─ BranchCard.jsx
│  │  ├─ Footer.jsx
│  │  ├─ FormInput.jsx
│  │  ├─ MaterialCard.jsx
│  │  ├─ Modal.jsx
│  │  ├─ Navbar.jsx
│  │  ├─ PdfViewer.jsx
│  │  ├─ SemesterCard.jsx
│  │  └─ SubjectCard.jsx
│  ├─ context/                    # Global React context providers
│  │  └─ AppContext.jsx
│  ├─ data/                       # Static academic metadata and mock content
│  │  └─ dummyData.js
│  ├─ lib/                        # API client and external integrations
│  │  └─ api.js
│  ├─ pages/                      # Route-level screens
│  │  ├─ Admin.jsx
│  │  ├─ Branch.jsx
│  │  ├─ Home.jsx
│  │  ├─ Login.jsx
│  │  ├─ Semester.jsx
│  │  ├─ Signup.jsx
│  │  ├─ StudyGuideBot.jsx
│  │  ├─ Subject.jsx
│  │  ├─ Upload.jsx
│  │  └─ UserDashboard.jsx
│  ├─ routes/                     # Reserved for future route modules
│  ├─ App.jsx                     # Root app composition + router shell
│  ├─ index.css                   # Global styles and Tailwind theme tokens
│  └─ main.jsx                    # React app bootstrap
├─ .env                           # Environment variables (local)
├─ index.html                     # Vite HTML entry
├─ eslint.config.js               # ESLint configuration
├─ vite.config.js                 # Vite + plugin configuration
├─ package.json                   # Scripts and dependency manifest
└─ package-lock.json              # Locked dependency graph
```

Recommended convention for future growth:

- Keep `components/` for reusable view pieces only.
- Keep page-specific logic inside `pages/` and extract shared logic to `lib/` or `context/`.
- If routing complexity increases, move route guards/layouts into `src/routes/`.

## Design and UX Notes

- Responsive layout with desktop + mobile navigation variants
- Motion-driven transitions and section reveal animations
- Theming via Tailwind v4 @theme custom color tokens
- Visual consistency across auth, dashboard, admin, and discovery pages

## Validation and Constraints Implemented in UI

- Upload page:
  - PDF-only file validation
  - Max 5MB file size guard
  - Requires core metadata fields before submit
  - Requires either file upload or external link
- Study Guide page:
  - Syllabus PDF required
  - Optional notes PDF
  - PDF type + size checks (5MB max)
  - YouTube playlist URL must include list parameter

## Deployment

This project is frontend-only and can be deployed on any static host:

- Vercel
- Netlify
- Render static sites
- GitHub Pages (with SPA routing handling)

Make sure VITE_API_BASE_URL is set to your production backend URL.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

Suggested contribution areas:

- Improve search/filter experience for materials
- Add richer dashboard analytics and charts
- Expand AI Study Guide prompt capabilities
- Add unit/integration tests
- Add loading skeletons and empty states across all pages

## Known Limitations / Future Scope

- No automated test suite configured yet
- Accessibility audit can be expanded (keyboard and screen-reader depth)
- Better error boundaries and retry UX can be added
- Real-time notifications for moderation events can be integrated

## License

Use the license file in this repository (or add one if not yet defined).
