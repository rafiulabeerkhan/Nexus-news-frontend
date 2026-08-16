# NexusNews 📰

> A beautifully designed, high-performance, full-stack News Portal application built for scalability and modern user experience. 

![NexusNews Banner](https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&q=80&w=1200&h=400)

## 🚀 Overview

**NexusNews** is a comprehensive news publishing platform. It features a stunning, fast, and responsive public-facing news site, paired with a secure administrative dashboard for managing articles, authors, and dynamic categories. 

This repository contains the **Frontend** application. The backend API is powered by a robust **.NET / C#** architecture.

---

## ✨ Key Features

- **Modern & Immersive UI:** Built with Tailwind CSS and Framer Motion for buttery-smooth animations, glassmorphism elements, and a premium reading experience.
- **Dynamic SEO:** Fully integrated with `react-helmet-async` to dynamically generate Open Graph tags and meta descriptions, ensuring articles look perfect when shared on Facebook, Twitter, and WhatsApp.
- **Admin & Moderator Dashboard:** A secure, role-based dashboard for content management (CRUD operations on News, Categories, and Media).
- **Blazing Fast Performance:** Powered by Vite, utilizing React `lazy()` and `Suspense` for aggressive code-splitting and optimized bundle sizes.
- **State Management:** Utilizes `Zustand` for lightweight, scalable global state (including authentication).
- **Portfolio Demo Mode:** Built-in read-only mode (`IS_DEMO_MODE`) to allow recruiters and visitors to safely explore the Admin Dashboard without mutating the live database.
- **Global Error Handling:** Implements comprehensive React Error Boundaries to gracefully catch rendering or network failures.

---

## 🛠️ Technology Stack

- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS + Custom CSS Utilities
- **Animations:** Framer Motion
- **Routing:** React Router v7
- **State Management:** Zustand
- **Data Fetching:** Axios (with interceptors & token refresh logic)
- **Icons:** React Icons & Lucide React
- **SEO:** React Helmet Async

---

## 📦 Local Setup & Installation

### Prerequisites
- Node.js (v18+)
- Running instance of the .NET Backend API

### 1. Clone the repository
```bash
git clone https://github.com/rafiulabeerkhan/NexusNews-Frontend.git
cd NexusNews-Frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and add the necessary keys (e.g., your Vite API URL or proxy configurations).

### 4. Run the Development Server
```bash
npm run dev
```
The application will be available at `http://localhost:5173`. 
*(Note: API calls are automatically proxied to the backend via Vite's proxy configuration).*

---

## 🔒 Demo Mode (Portfolio Protection)

For portfolio showcases, this application includes a built-in **Demo Mode**. 
When `IS_DEMO_MODE = true` in `src/config/api.js`, all `POST`, `PUT`, `PATCH`, and `DELETE` requests are intercepted by Axios and blocked. This allows visitors to safely log in and explore the admin dashboard without altering the production database.

To add real data, temporarily switch this flag to `false`.

---

## 👨‍💻 Developed By

**Rafiul Islam Khan**  
Full-Stack Developer  

🔗 **Portfolio:** [rafiulabeerkhan.vercel.app](https://rafiulabeerkhan.vercel.app/)  
