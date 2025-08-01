# Nebusis® Website v2.0

## Overview
This is the official website for Nebusis®, a leading provider of AI-powered SaaS solutions for digital transformation, compliance management, and enterprise applications.

**Version:** 2.0.0  
**Date:** August 1, 2025  
**Platform:** React + TypeScript + Tailwind CSS  

## Features
- 🎯 **23 Business Applications** - Comprehensive enterprise software suite
- 🏭 **11 Sector-Specific Suites** - Industry-tailored solutions  
- 🎓 **16 Certification Programs** - Professional development courses
- 🔄 **7 Digital Transformation Services** - Strategic consulting offerings
- 📱 **Responsive Design** - Mobile-first, accessible interface
- ⚡ **Modern Stack** - React 18, TypeScript, Tailwind CSS, Wouter routing

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Runs on http://localhost:5173

### Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Deployment

### GitHub Pages
1. Push code to GitHub repository
2. Enable GitHub Pages in repository settings
3. Set source to GitHub Actions
4. Build will deploy automatically

### AWS S3 + CloudFront
1. Build the project: `npm run build`
2. Upload `dist/` contents to S3 bucket
3. Configure CloudFront distribution
4. Set index.html as default root object

### Render
1. Connect GitHub repository to Render
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on git push

### Vercel
1. Connect GitHub repository to Vercel
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`

### Netlify
1. Connect GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy automatically on git push

## Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── layout/         # Layout components (Header, Footer)
│   └── pricing/        # Pricing calculators
├── pages/              # Page components
├── lib/                # Utilities and configurations
├── hooks/              # Custom React hooks
└── index.css          # Global styles
```

## Key Technologies
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Accessible component library
- **Wouter** - Lightweight routing
- **React Query** - Data fetching and caching
- **React Hook Form** - Form handling
- **Framer Motion** - Animations
- **Lucide React** - Icon library

## Environment Variables
No environment variables required for static deployment.

## Browser Support
- Chrome (latest)
- Firefox (latest)  
- Safari (latest)
- Edge (latest)

## License
© 2024 Nebusis®. All rights reserved.

## Support
For technical support or questions about deployment, please contact the Nebusis® development team.