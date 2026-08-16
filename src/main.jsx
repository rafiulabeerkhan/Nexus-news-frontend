import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <ThemeProvider className="font-bengali bg-white dark:bg-bbc-dark min-h-screen">
      <App />
      <ToastContainer />
    </ThemeProvider>
  </HelmetProvider>
);
