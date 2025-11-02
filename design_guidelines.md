# Design Guidelines: GitHub Bot Deployment Tool

## Design Approach

**Selected Approach**: Modern Developer Tool Interface (inspired by GitHub, Vercel, Render)
- Function-first design optimized for technical users
- Clean, minimal aesthetic with strategic use of depth and gradients
- Single-page application with clear state management (logged out → logged in → forked → deployed)
- Trust-building through familiar patterns from developer platforms

## Core Design Elements

### A. Typography
- **Primary Font**: Inter or SF Pro Display via Google Fonts CDN
- **Headings**: 
  - H1: 48px (3rem), font-weight 700, tight letter-spacing (-0.02em)
  - H2: 32px (2rem), font-weight 600
  - H3: 24px (1.5rem), font-weight 600
- **Body Text**: 16px (1rem), font-weight 400, line-height 1.6
- **Small/Captions**: 14px (0.875rem), font-weight 500
- **Monospace** (for technical details): 'Fira Code' or 'JetBrains Mono', 14px

### B. Layout System
**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16, 24 for consistency
- Container: max-w-4xl mx-auto px-6
- Section padding: py-16 on desktop, py-12 on mobile
- Component spacing: gap-8 for major sections, gap-4 for related elements
- Card padding: p-8 on desktop, p-6 on mobile

**Grid Strategy**:
- Single-column centered layout (max-w-2xl) for main content
- Two-column split (60/40) for feature explanations vs. visual demonstrations
- Three-column grid for step indicators (even distribution)

### C. Component Library

**Hero Section**:
- Full viewport height (min-h-screen) with centered content
- Gradient background (subtle, developer-friendly - think dark blue to purple gradient)
- Large icon/logo area featuring GitHub + Render branding integration
- Primary heading explaining the tool's purpose
- Subheading with key benefits (3-5 words each, bullet format)
- Large, prominent "Connect with GitHub" OAuth button

**Step Indicator Component**:
- Horizontal stepper showing: Connect → Fork → Deploy → Done
- Each step as a circle with number/icon
- Active step highlighted, completed steps with checkmark
- Connecting lines between steps
- Responsive: stacks vertically on mobile

**OAuth Button**:
- Large, rectangular button (min-h-14) with GitHub logo
- Text: "Continue with GitHub"
- Subtle shadow, rounded corners (rounded-lg)
- Hover state: slight lift effect and deeper shadow
- Loading state: Spinner replacing GitHub icon

**Repository Card**:
- Bordered card (border-2) with rounded corners (rounded-xl)
- Repository name as heading with GitHub icon
- Description of bot features (2-3 sentences)
- Fork count and star count badges
- "Fork Repository" button (full-width, primary style)
- Status indicator showing fork progress

**Deploy Section**:
- Prominent "Deploy to Render" button styled similarly to Render's brand
- Opens Render's deployment interface with pre-filled repo
- Visual representation of what will be deployed (mini diagram or card)
- Environment variables preview (collapsed by default, expandable)

**Status Feedback**:
- Toast notifications for success/error states
- Inline status messages with icons (✓ for success, ⚠ for errors)
- Progress indicators for async operations (forking, etc.)

**Footer**:
- Minimal footer with links to: GitHub repo, Documentation, Support
- Attribution to original bot creator
- Vercel deployment badge

### D. Visual Treatment

**Cards & Containers**:
- Subtle shadows: shadow-lg for elevated elements
- Borders: 1px solid with low-opacity borders for definition
- Rounded corners: rounded-xl for cards, rounded-lg for buttons
- Background: Slightly elevated from page background (use of bg-opacity)

**Buttons**:
- Primary: Solid fill, rounded-lg, px-8 py-4, font-weight 600
- Secondary: Outlined style with 2px border
- Disabled state: Reduced opacity (opacity-50) with cursor-not-allowed
- All buttons: smooth transitions (transition-all duration-200)

**Icons**:
- Use Heroicons via CDN for UI icons
- GitHub logo from official GitHub assets
- Render logo/wordmark from official brand assets
- Icon size: 20px (w-5 h-5) for inline, 32px (w-8 h-8) for feature highlights

**State Transitions**:
- Fade-in animations for content reveal (duration-300)
- Slide-in for notifications (from top or right)
- Smooth height transitions for expandable sections
- No excessive motion - respect reduced-motion preferences

## Page Structure

**Single-Page Layout Flow**:

1. **Hero/Landing State** (Before Login)
   - Centered content explaining the tool
   - Large GitHub OAuth button
   - Trust indicators (secure, no storage, open source)
   - Visual: Subtle animated gradient background

2. **Authenticated State** (After Login)
   - Welcome message with user's GitHub avatar
   - Step indicator showing current progress
   - Repository information card
   - Fork action button

3. **Fork Success State**
   - Confirmation message with link to forked repo
   - Deploy to Render button (prominently displayed)
   - Next steps guidance

4. **Completion State**
   - Success message
   - Link to deployed Render service
   - Option to deploy another instance

**Responsive Behavior**:
- Desktop (lg+): Side-by-side layouts for explanations + visuals
- Tablet (md): Maintain two-column where it makes sense
- Mobile (base): Single column, full-width buttons, stacked components

## Trust & Security Elements

- **Security Badge**: "Secure OAuth" indicator near login button
- **Permissions Notice**: Clear explanation of GitHub access needed
- **Privacy Statement**: "We don't store your credentials" message
- **Open Source Badge**: Link to frontend source code
- All security elements use lock icons and trust-building language

## Accessibility

- All interactive elements keyboard navigable
- ARIA labels for icon-only buttons
- Focus states clearly visible (ring-2 ring-offset-2)
- Sufficient contrast ratios (WCAG AA minimum)
- Status messages announced to screen readers

## Images

**Hero Section**: No large hero image. Instead, use an **animated gradient background** (CSS gradient from deep blue to purple) with floating geometric shapes or code-like patterns to convey technical sophistication without heavy image loads.

**Icon Graphics**: 
- GitHub Octocat logo (official asset)
- Render logo (official asset)  
- Simple arrow/flow diagram showing GitHub → Fork → Render flow
- Checkmark icons for completed steps

**No Photography**: This is a developer tool - keep it clean, technical, and icon-based rather than photographic.