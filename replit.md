# Eclipse MD Bot Deployment Tool

A modern web application that simplifies deploying the Horlapookie-bot WhatsApp bot to Render. Users authenticate with GitHub, automatically fork the repository, and deploy with a single click.

## Project Overview

**Purpose**: Enable users to deploy their own instance of the Eclipse MD WhatsApp bot without manual repository forking.

**Key Features**:
- GitHub OAuth authentication with automatic repository forking
- Interactive deployment carousel showing step-by-step Render deployment process
- One-click deployment to Render using render.yaml blueprint
- Clean, developer-focused UI inspired by modern developer tools (Vercel, Render, GitHub)

## Architecture

**Frontend**: React with TypeScript, TanStack Query, Wouter routing, Shadcn UI components
**Backend**: Express.js with GitHub OAuth integration
**Storage**: In-memory session storage (upgrade to Redis/database for production)
**Deployment Target**: Vercel (frontend + API routes)

## User Flow

1. User lands on hero page
2. Clicks "Login with GitHub" → redirects to GitHub OAuth
3. GitHub redirects back after authorization
4. Backend automatically forks Horlapookie-bot repository
5. User sees deployment page with:
   - Success message confirming fork
   - Interactive carousel showing 9 Render deployment steps
   - "Deploy to Render" button
6. User clicks deploy → opens Render with their forked repository pre-configured

## Technical Implementation

### GitHub OAuth Flow

**Routes**:
- `GET /api/auth/github` - Initiates OAuth, redirects to GitHub
- `GET /api/auth/github/callback` - Handles callback, forks repo, creates session
- `GET /api/auth/session` - Returns current user session
- `POST /api/auth/logout` - Clears session

**Environment Variables**:
- `GITHUB_CLIENT_ID` - GitHub OAuth app client ID
- `GITHUB_CLIENT_SECRET` - GitHub OAuth app client secret

### Session Management

- HTTP-only cookies for session storage
- 24-hour session expiration
- State token validation for OAuth security
- No long-term GitHub token storage

### Deployment Carousel

9 hosted images showing complete Render deployment process:
1. Enter Blueprint Name
2. Configure Environment Variables
3. Deploy Blueprint button
4. Blueprint creation confirmation
5. Service deployment progress
6. Build logs
7. Service goes live with URL
8. Bot's primary interface
9. WhatsApp connection success

## File Structure

```
client/src/
├── pages/Home.tsx - Main application logic, session management
├── components/
│   ├── HeroSection.tsx - Landing page with GitHub login
│   ├── DeploySection.tsx - Deployment UI with carousel
│   ├── DeploymentCarousel.tsx - Interactive step-by-step guide
│   ├── StepIndicator.tsx - Progress tracker (Connect → Deploy → Done)
│   ├── UserProfile.tsx - User info display
│   └── StatusMessage.tsx - Success/error notifications

server/
├── routes.ts - GitHub OAuth + API endpoints
└── index.ts - Express server setup
```

## Recent Changes

**2025-11-02**:
- Implemented GitHub OAuth authentication flow
- Added automatic repository forking on login
- Created deployment carousel with 9 Render process screenshots
- Simplified flow from 4 steps to 3 (Connect → Deploy → Done)
- Changed button from "Continue with GitHub" to "Login with GitHub"
- Integrated cookie-based session management

## Design Guidelines

- Modern developer tool aesthetic (Inter font, clean layouts)
- Automatic dark mode support
- Shadcn UI components for consistency
- Minimal, focused UI - no unnecessary elements
- Primary color scheme with subtle accents
