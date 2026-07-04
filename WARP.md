# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Essential Commands
```bash
npm install           # Install dependencies
npm run dev          # Start development server at http://localhost:3000
npm run build        # Build for production
```

### Environment Setup
- Ensure `.env` file exists with Supabase credentials:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
- College email restriction: Only `@igdtuw.ac.in` emails are accepted for signup

## Architecture Overview

### Core Technology Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS with custom glass morphism effects
- **UI Components**: Extensive use of Radix UI primitives
- **Backend**: Supabase (authentication + database)
- **State Management**: React Context API for authentication

### Application Architecture

**Single Page Application Structure:**
- `App.tsx` serves as the main router using state-based navigation
- All pages are rendered conditionally within a single layout
- Navigation handled through `onNavigate` prop drilling

**Key Components Hierarchy:**
```
App (AuthProvider wrapper)
├── AppContent (main routing logic)
    ├── GalaxyBackground (persistent animated background)
    ├── Navbar (shown when authenticated)
    └── Page Components:
        ├── LandingPage (login/signup forms)
        ├── Dashboard (main hub with quick access)
        ├── ProfilePage
        ├── BranchResourcesPage
        ├── MarketplacePage
        ├── SocietiesPage
        └── NetworkingPage
```

### Authentication Flow
1. **Landing Page**: Users choose between login/signup
2. **Email Validation**: Restricts to `@igdtuw.ac.in` domain
3. **Supabase Integration**: 
   - Authentication via `AuthContext`
   - User profiles stored in `students` table
   - Session persistence across page refreshes

### Database Schema Context
- `students` table contains user profiles with fields: `id`, `name`, `email`, `branch`, `year`
- Foreign key relationship with Supabase Auth users via `id` field

### UI Design System
- **Color Palette**: 
  - Primary: `#00E5FF` (cyan) with glow effects
  - Text: `#EAEAEA` (light gray)
  - Secondary: `#A0AEC0` (medium gray)
  - Gradients: `#0D47A1` to `#00BFFF`
- **Components**: Glass morphism cards with backdrop blur
- **Typography**: Inter font family system-wide

### File Organization
```
src/
├── components/           # Main feature components
│   ├── ui/              # Radix UI component wrappers
│   ├── auth/            # LoginForm, SignupForm
│   └── figma/           # Generated Figma components
├── context/             # React Context providers
├── hooks/               # Custom React hooks
├── lib/                 # External service clients (Supabase)
└── styles/              # Global CSS files
```

### Development Patterns

**State Management:**
- Global auth state via React Context
- Local component state with useState hooks
- No external state management library

**Navigation:**
- Manual routing through conditional rendering
- Page state managed in main `App.tsx`
- Navigation triggered via callback props

**Error Handling:**
- Auth errors displayed on landing page
- Supabase errors caught and displayed to users
- Custom error messages for common scenarios (wrong email domain, etc.)

**Component Architecture:**
- Functional components with TypeScript interfaces
- Props drilling for navigation and state updates
- Reusable `GlassCard` component for consistent styling

### Key Integration Points
- **Supabase Client**: All database and auth operations
- **Vite Aliases**: Configured for `@/` path resolution to `src/`
- **Environment Variables**: All config via `VITE_` prefixed env vars

### Code Conventions
- TypeScript strict mode enabled
- React 18 patterns (useContext, functional components)
- Inline styling for component-specific designs
- TailwindCSS classes for layout and common styles
- Camel case for component and function names
- Interface definitions for all component props
