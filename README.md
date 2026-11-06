#  BookHaven - Online Book Borrowing Platform

A modern, responsive, and full-stack web application designed to digitize the traditional library experience. Users can explore a vast collection of books, filter by categories, view detailed information, and borrow titles digitally.

## 🔗 Live Links
- **Live URL:** [https://my-assignment-08-sigma.vercel.app]


##  Key Features
- **Secure Authentication:** Integrated with BetterAuth supporting Email/Password and Google OAuth login.
- **Protected Routes:** Middleware (`proxy.js`) secured private routes such as User Profile and Book Details.
- **Dynamic Book Exploration:** All Books page equipped with real-time title search and category-based sidebar filtering (Story, Tech, Science).
- **Interactive Borrow System:** Stock validation and dynamic toast notifications (`react-hot-toast`) upon borrowing books.
- **User Profile Management:** Dedicated profile route with seamless user information update capabilities.
- **Responsive UI:** Fully responsive design built with Next.js App Router, Tailwind CSS, and DaisyUI, featuring Swiper.js sliders.

## 📦 NPM Packages Used
- `next`
- `better-auth`
- `mongodb`
- `react-hot-toast`
- `swiper`
- `tailwindcss`
- `daisyui`

## 🛠️ Tech Stack
- **Frontend & Backend:** Next.js (App Router)
- **Database:** MongoDB
- **Styling:** Tailwind CSS, DaisyUI
- **Authentication:** BetterAuth
- **Deployment:** Vercel
