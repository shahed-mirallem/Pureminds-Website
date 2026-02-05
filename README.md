# Pureminds Website

A high-end web platform featuring cinematic UX with scroll-based animations, built with React 19, Tailwind CSS 4.0, and Laravel 11 PHP backend.

## 🎨 Features

- **Cinematic UX**: Smooth scroll-tied animations using GSAP ScrollTrigger
- **Modern Stack**: React 19 with Vite, Tailwind CSS 4.0, Laravel 11
- **Decoupled Architecture**: Separate frontend and backend for scalability
- **Elegant Typography**: Ultra-thin (100-weight) serif fonts (Cormorant Garamond)
- **Strict PHP Typing**: Type-safe PHP 8.3+ code with `declare(strict_types=1)`
- **React 19 Standards**: No manual memoization, following latest best practices

## 🚀 Tech Stack

### Frontend
- **React 19** - Latest React with improved performance
- **Vite** - Fast build tool and dev server
- **Tailwind CSS 4.0** - Utility-first CSS framework
- **GSAP & ScrollTrigger** - Professional-grade animations
- **Cormorant Garamond** - Ultra-thin serif typography

### Backend
- **Laravel 11** - Modern PHP framework
- **PHP 8.3+** - Latest PHP with strict typing
- **Laravel Sanctum** - API authentication
- **RESTful API** - Clean, decoupled architecture

## 📦 Installation

### Prerequisites
- Node.js 20+ and npm
- PHP 8.3+
- Composer

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

### Backend Setup

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

The backend API will run on `http://localhost:8000`

## 🎭 Animation Features

- **Sticky Pinning**: Sections pin during scroll for dramatic effect
- **Mask Reveals**: Staggered reveal animations with `scrub: 1`
- **Smooth Scroll**: All animations tied to scroll position
- **People & Co Aesthetic**: Inspired by high-end agency websites

## 🏗️ Project Structure

```
Pureminds-Website/
├── frontend/              # React 19 + Vite frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   │   ├── Hero.jsx
│   │   │   ├── StickySection.jsx
│   │   │   ├── MaskReveal.jsx
│   │   │   └── Footer.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── backend/              # Laravel 11 API
    ├── app/
    │   └── Http/
    │       └── Controllers/
    │           └── Api/
    │               └── ContentController.php
    ├── routes/
    │   └── api.php
    └── composer.json
```

## 🎯 API Endpoints

- `GET /api/content` - Get platform content
- `POST /api/contact` - Submit contact form

## 📝 Development

### Frontend Development
```bash
cd frontend
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview production build
```

### Backend Development
```bash
cd backend
php artisan serve  # Start dev server
php artisan test   # Run tests
```

## 🌐 Deployment

### Frontend
Build the frontend and deploy to any static hosting:
```bash
cd frontend
npm run build
# Deploy the 'dist' folder
```

### Backend
Deploy Laravel using your preferred method (Laravel Forge, Vapor, etc.)

## 📄 License

© 2026 Pureminds. All rights reserved.
