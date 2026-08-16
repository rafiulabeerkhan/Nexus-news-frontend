import flowbiteReact from "flowbite-react/plugin/tailwindcss";
const flowbite = require("flowbite/plugin");

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/lib/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    "./.flowbite-react/class-list.json",
    ".flowbite-react\\class-list.json"
  ],

  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1rem",
        lg: "2rem",
        xl: "3rem",
        "2xl": "4rem",
      },
    },

    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        bengali: ["Noto Sans Bengali", "sans-serif"],
      },

      screens: {
        xs: "480px",
      },

      colors: {
        /* ================= NexusNews BRAND ================= */
        nexus: {
          brand: "#4f46e5", // Indigo-600
          dark: "#0f172a", // Slate-900
          darker: "#020617", // Slate-950
          gray: "#334155", // Slate-700
          hover: "#1e293b", // Slate-800
          lightGray: "#cbd5e1", // Slate-300
          border: "#1e293b", // Slate-800
          white: "#ffffff",
        },

        /* ================= PRIMARY ================= */
        primary: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },

        /* ================= SECONDARY ================= */
        secondary: {
          DEFAULT: "#1c1c1c",
          hover: "#2b2b2b",
          light: "#333333",
        },

        /* ================= TEXT ================= */
        text: {
          DEFAULT: "#1c1c1c",
          light: "#6b7280",
          muted: "#9ca3af",

          dark: "#ffffff",
          "dark-light": "#d6d6d6",

          orange: "#F77E2D",
        },

        /* ================= HEADER ================= */
        header: {
          bg: "#4f46e5",
          text: "#ffffff",
          hover: "#4338ca",
        },

        /* ================= FOOTER ================= */
        footer: {
          bg: "#1c1c1c",
          border: "#404040",
          text: "#ffffff",
          muted: "#d6d6d6",
          hover: "#ffffff",
        },

        /* ================= ARTICLE ================= */
        article: {
          title: "#1c1c1c",
          description: "#4b5563",
          meta: "#6b7280",

          "title-dark": "#ffffff",
          "description-dark": "#d6d6d6",
        },

        /* ================= CARD ================= */
        card: {
          bg: "#ffffff",
          hover: "#f8fafc",
          border: "#e5e7eb",

          "bg-dark": "#1c1c1c",
          "hover-dark": "#2d2d2d",
          "border-dark": "#303030",
        },

        /* ================= SIDEBAR ================= */
        "sidebar-bg": "#0f172a",
        "sidebar-text": "#ffffff",
        "sidebar-hover": "#1e293b",
        "sidebar-active": "#4f46e5",
        "sidebar-border": "#334155",

        "sidebar-bg-dark": "#020617",
        "sidebar-text-dark": "#ffffff",
        "sidebar-hover-dark": "#0f172a",
        "sidebar-active-dark": "#4f46e5",
        "sidebar-border-dark": "#1e293b",

        /* ================= NAVBAR ================= */
        "navbar-bg": "#ffffff",
        "navbar-text": "#1c1c1c",
        "navbar-border": "#e5e7eb",
        "navbar-hover": "#f9fafb",

        "navbar-bg-dark": "#1c1c1c",
        "navbar-text-dark": "#ffffff",
        "navbar-border-dark": "#303030",
        "navbar-hover-dark": "#2d2d2d",

        /* ================= BUTTON ================= */
        button: {
          primary: "#4f46e5",
          "primary-hover": "#4338ca",

          secondary: "#1c1c1c",
          "secondary-hover": "#2d2d2d",

          light: "#ffffff",
          "light-dark": "#121212",

          success: "#16a34a",
          "success-hover": "#15803d",

          danger: "#dc2626",
          "danger-hover": "#b91c1c",
        },

        /* ================= STATUS ================= */
        success: "#16a34a",
        "success-hover": "#15803d",

        warning: "#f59e0b",
        "warning-hover": "#d97706",

        danger: "#ef4444",
        "danger-hover": "#dc2626",

        info: "#0ea5e9",
        "info-hover": "#0284c7",

        /* ================= BREAKING NEWS ================= */
        breaking: {
          bg: "#4f46e5",
          text: "#ffffff",
        },

        /* ================= NEWS CATEGORY COLORS ================= */
        category: {
          national: "#4f46e5",
          world: "#404040",
          politics: "#8b0000",
          sports: "#ffd230",
          business: "#0066cc",
          technology: "#7fba00",
          entertainment: "#8f1f63",
          health: "#16a34a",
          education: "#2563eb",
        },
      },

      boxShadow: {
        card: "0 4px 6px -1px rgba(0,0,0,.05), 0 2px 4px -2px rgba(0,0,0,.05)",
        article: "0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.05)",
        header: "0 4px 6px -1px rgba(0,0,0,.1)",
      },

      borderRadius: {
        card: "12px",
      },

      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },

      transitionDuration: {
        400: "400ms",
      },
    },
  },

  plugins: [flowbite, flowbiteReact],
};
