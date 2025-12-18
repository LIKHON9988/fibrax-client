# FibraX — Modern Garment Commerce Platform (Client)

FibraX is a role‑based garment commerce platform featuring a glassmorphism UI, secure authentication with Firebase, manager/admin workflows, Stripe payments, and modern animations. This document covers the frontend (client) with key notes about the server where relevant.

## Overview

- Responsive, professional UI built with Tailwind CSS and glassmorphism styling
- Role‑based dashboards for Admin, Manager, and Buyer
- Secure API access using Firebase ID tokens and an axios interceptor
- Stripe Checkout integration for payments
- Swiper sliders and Framer Motion animations for a modern experience
- Real‑time data fetching and caching with TanStack Query

## Tech Stack

- Frontend: React 19, Vite 7, React Router 7, Tailwind CSS 4, DaisyUI, Swiper, Framer Motion, TanStack Query, React Hot Toast, React Icons
- Backend: Express 5, MongoDB, Firebase Admin, Stripe

## Key Features

- Authentication: Firebase email/password and Google sign‑in
- Role‑based access:
  - Admin: Manage users, approve manager requests, view all products/orders
  - Manager: Manage products, view/manage orders, Approved/Pending lists
  - Buyer: Browse, purchase, view My Orders, track order status
- Payment: Stripe Checkout flow with post‑success order creation
- Orders lifecycle: Managers can update order status to Pending/Approved/Rejected
- Home experience: Swiper‑powered hero, products carousel, services, values, and customer reviews
- Animations: Smooth entrance and hover effects via Framer Motion

## Getting Started

### Prerequisites

- Node.js LTS
- A running backend (see FibraX‑server README/env)
- Firebase project with web app credentials
- Stripe secret key
- MongoDB connection string
- imgbb API key (for profile/product image uploads)

### Environment

SERVER_SITE=https://fibrax-server.vercel.app/
CLIENT_DOMAIN=https://final-project-9fbd1.web.app/

### Install & Run

Frontend:

```

npm install
npm run dev
```

Backend:

```

npm install
npm run dev
```

### Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run preview` — preview built app
- `npm run lint` — run ESLint

## Authentication & Security

- Firebase handles user auth; on sign‑in, the client gets an ID token
- `useAxiosSecure` injects `Authorization: Bearer <token>` on requests
- Server verifies tokens with Firebase Admin in `verifyJWT`

## Data & API (Highlights)

- Products:
  - `GET /products`, `GET /active-products`, `GET /products/:id`
  - `PATCH /products/:id` (manager), `DELETE /products/:id`
- Orders:
  - `POST /create-checkout-session` (Stripe)
  - `POST /paymentSuccessful` (server finalization)
  - `GET /my-orders` (buyer)
  - Manager: `GET /manage-orders/:email`, `/approved`, `/pending`
  - `PATCH /orders/:id/status` (manager)
- Users:
  - `POST /users` (create/update on login/signup)
  - `GET /user/role` (secure, returns current role)
  - `PATCH /update-role` (admin)
  - `PATCH /users/profile` (self update: name, image)
- Reviews:
  - `GET /reviews` (customer feedback)

## UI/UX Notes

- Glassmorphism theme: blurred backgrounds, translucent cards, soft borders
- Sliders: Swiper with `EffectCoverflow`, `Autoplay`, `Pagination`
- Animations: Framer Motion spring transitions, staggered entrances, subtle hover scale
- Components:
  - `HeroSection.jsx` — animated hero with CTA
  - `Products.jsx` — product carousel with motion
  - `OurServices.jsx` — arched images with motion
  - `OurValues.jsx` — animated grid
  - `CustomerFeedback.jsx` — reviews slider with motion
  - Dashboards for Admin/Manager/Buyer with professional tables and modals

## Development Workflow

- Use TanStack Query for data fetching/cache invalidation
- Keep secure calls via `useAxiosSecure`
- Use `imageUpload` utility (imgbb) for user/product images
- Avoid committing secrets; use `.env`
- Run `npm run lint` before PRs/commits

## Folder Structure (Client)

```
src/
  components/
    Home/ (HeroSection, Products, OurServices, OurValues, CustomerFeedback)
    Dashboard/ (Sidebar, Statistics, TableRows, modals)
    Shared/ (Navbar, Container, Button, LoadingSpinner)
  pages/
    Dashboard/ (Admin, Maneger, Customer, Common/Profile.jsx)
    Auth (Login, SignUp)
    ProductDetails, AllProduct, AboutUs, Home
  hooks/ (useAuth, useAxiosSecure, useRole)
  providers/ (AuthProvider)
  routes/ (Routes.jsx, PrivateRoute.jsx)
  utils/ (imageUpload, saveOrUpdateUser)
```

## Troubleshooting

- 401/403 responses: token invalid/expired; re‑authenticate
- Stripe errors: check `CLIENT_DOMAIN` and webhook/session data
- Images not uploading: verify `VITE_IMGBB_API_KEY`
- Role‑protected endpoints: ensure proper role on the server

## License

This project is intended for educational and assessment purposes. Adapt for production use with appropriate reviews and hardening.
