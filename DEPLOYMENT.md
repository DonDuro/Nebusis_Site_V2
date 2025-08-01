# Nebusis® Website Deployment Guide v2.0

## Platform-Agnostic Deployment Package
**Version:** 2.0.0  
**Date:** August 1, 2025  
**Package:** NebusisSite_v2.0_01AUG2025

## Overview
This package contains a complete, static website build ready for deployment on any modern hosting platform. All Replit-specific dependencies and backend code have been removed to ensure platform agnostic deployment.

## What's Included
- ✅ Clean React + TypeScript + Tailwind CSS application
- ✅ Platform-agnostic build configuration  
- ✅ Static asset handling
- ✅ Deployment configs for GitHub Pages, Netlify, Vercel, Render, AWS
- ✅ Responsive design with mobile-first approach
- ✅ SEO optimized with proper meta tags
- ✅ Accessible UI components (shadcn/ui)

## What's Removed
- ❌ All backend server code (Express.js, Node.js APIs)
- ❌ Database dependencies (PostgreSQL, Drizzle ORM)
- ❌ Replit-specific plugins and configurations
- ❌ Authentication systems and portals
- ❌ Payment processing (Stripe integration)
- ❌ Session management
- ❌ Server-side dependencies

## Quick Deployment

### 1. GitHub Pages
```bash
# 1. Push to GitHub repository
git init
git add .
git commit -m "Initial commit"
git remote add origin [your-repo-url]
git push -u origin main

# 2. Enable GitHub Pages in repository settings
# 3. Build will deploy automatically via GitHub Actions
```

### 2. Netlify
```bash
# Option A: Drag & drop dist folder to Netlify
npm run build
# Upload dist/ folder to Netlify

# Option B: Git integration
# Connect repository to Netlify - builds automatically
```

### 3. Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### 4. AWS S3 + CloudFront
```bash
# Build project
npm run build

# Upload dist/ contents to S3 bucket
aws s3 sync dist/ s3://your-bucket-name --delete

# Configure CloudFront distribution pointing to S3
```

### 5. Render
```bash
# Connect GitHub repository to Render
# Configuration is included in render.yaml
```

## Build Commands
- **Install:** `npm install`
- **Development:** `npm run dev`
- **Build:** `npm run build`
- **Preview:** `npm run preview`

## Environment Setup
No environment variables required for static deployment.

## Asset Handling
All assets are served from `/public/assets/` directory and referenced with absolute paths for maximum compatibility.

## SEO Configuration
- Meta tags configured in index.html
- Proper title tags for each page
- Open Graph tags for social sharing
- Responsive viewport configuration

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations
- Code splitting with Vite
- Tree shaking for unused code elimination
- Asset optimization and compression
- CSS purging for minimal bundle size

## Content Management
All content is managed through static TypeScript files in `/src/lib/staticData.ts`. Update this file to modify:
- Business applications
- Sector suites
- Certifications
- Digital transformation services
- Company information

## Troubleshooting
1. **404 errors on refresh:** Ensure your hosting platform serves index.html for all routes
2. **Asset loading issues:** Verify assets are in `/public/assets/` directory
3. **Build failures:** Check Node.js version (requires 18+)

## Support
For deployment assistance, refer to the comprehensive README.md included in this package.