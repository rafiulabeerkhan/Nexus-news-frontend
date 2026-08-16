import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import PageLoader from "../components/PageLoader";
import { useNavigate } from "react-router-dom";
export default function Layout() {
  const { authUser, isLoggedIn } = useAuthStore();
  const navigate = useNavigate();
  return (
    <div className="relative flex w-full overflow-auto">
      <Sidebar />

      <main className="flex flex-col flex-grow max-h-screen overflow-auto">
        <Navbar />

        {authUser?.isProfileComplete === false && (
          <div className="w-full bg-[#059669]/10 border-b border-[#059669]/20 px-4 py-2 text-center text-sm text-[#059669]">
            Your profile is not complete.{" "}
            <button
              onClick={() => navigate(`/${authUser?.role}/profile`)}
              className="font-semibold underline hover:opacity-80 cursor-pointer"
            >
              Complete Profile
            </button>
          </div>
        )}

        <div className="flex-grow p-2">
          <PageLoader>
            <Outlet />
          </PageLoader>
        </div>

        <footer className="flex justify-end text-center p-2">
          <Footer />
        </footer>
      </main>
    </div>
  );
}
