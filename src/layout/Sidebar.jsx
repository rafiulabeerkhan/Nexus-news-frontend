import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { FaCircle } from "react-icons/fa6";
import { HiOutlineMenu } from "react-icons/hi";
import { useAuthStore } from "../store/authStore";
import menuConfig from "../config/menuConfig";
import { useMediaQuery } from "../utils/useMediaQuery.js";
import { motion } from "framer-motion";
import { useMemo, useCallback } from "react";
const Sidebar = () => {
  const location = useLocation();
  const { authUser } = useAuthStore();
  const isMobile = useMediaQuery("(max-width: 640px)");

  const [open, setOpen] = useState(true);
  const [subMenus, setSubMenus] = useState({});

  const toggleSubMenu = (key) => {
    if (!open) setOpen(true);

    setSubMenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const filteredMenus = useMemo(() => {
    return menuConfig
      .filter((menu) => menu.roles.includes(authUser?.role))
      .map((menu) => ({
        ...menu,
        subMenu: (menu.subMenu ?? []).filter((sub) =>
          sub.roles.includes(authUser?.role),
        ),
      }));
  }, [authUser?.role]);

  const isMenuActive = useCallback(
    (menu) =>
      location.pathname === menu.path ||
      menu.subMenu?.some((sub) => sub.path === location.pathname),
    [location.pathname],
  );

  useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm sm:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={clsx(
          "relative h-screen overflow-y-auto",
          "flex flex-col shrink-0 z-50",
          "scrollbar-hide",
          "transition-all duration-300 ease-in-out",
          "bg-sidebar-border text-sidebar-text",
          "dark:bg-sidebar-bg-dark dark:text-sidebar-text-dark",
          "border-r border-sidebar-border dark:border-sidebar-border-dark",
          "shadow-lg",
          open ? "w-64 p-5 pt-6" : "w-20 p-3 pt-6",
        )}
      >
        {/* Header */}
        <div className="mb-7 min-h-[48px] flex items-center justify-center">
          {!open ? (
            <div className="flex flex-col items-center gap-4 w-full">
              <button
                onClick={() => setOpen((prev) => !prev)}
                className="p-2.5 rounded-xl transition hover:bg-sidebar-hover dark:hover:bg-sidebar-hover-dark"
              >
                <HiOutlineMenu className="text-xl" />
              </button>

              <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center text-lg font-bold text-white">
                D
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full pl-1 gap-3">
              <div className="flex items-center flex-1 min-w-0">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="text-2xl font-extrabold cursor-pointer text-sidebar-text dark:text-sidebar-text-dark"
                >
                  NexusNews
                </motion.div>
              </div>

              <button
                onClick={() => setOpen((prev) => !prev)}
                className="absolute left-full shrink-0 p-2.5 rounded-xl transition hover:bg-sidebar-hover dark:hover:bg-sidebar-hover-dark"
              >
                <HiOutlineMenu className="text-xl" />
              </button>
            </div>
          )}
        </div>

        {/* Menus */}
        <ul className="flex flex-col gap-1.5 flex-grow">
          {filteredMenus.map((menu) => {
            const active = isMenuActive(menu);
            const hasSubMenu = menu.subMenu?.length > 0;

            return (
              <li key={menu.key} className="flex flex-col">
                <Link
                  to={hasSubMenu ? "#" : menu.path}
                  onClick={() => hasSubMenu && toggleSubMenu(menu.key)}
                  className={clsx(
                    "group relative flex items-center py-2.5 rounded-xl text-sm transition-all duration-200",
                    open ? "justify-between px-3.5" : "justify-center",
                    "hover:bg-sidebar-hover dark:hover:bg-sidebar-hover-dark",
                    active &&
                      "bg-sidebar-active dark:bg-sidebar-active-dark text-white shadow-card",
                  )}
                >
                  {active && (
                    <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-white" />
                  )}

                  <div className="flex items-center gap-3.5">
                    {menu.icon && <menu.icon className="text-xl shrink-0" />}

                    {open && <span className="truncate">{menu.title}</span>}
                  </div>
                </Link>

                {hasSubMenu && subMenus[menu.key] && open && (
                  <ul className="ml-5 mt-1 pl-2 border-l border-sidebar-border dark:border-sidebar-border-dark flex flex-col gap-1">
                    {menu.subMenu.map((sub, i) => (
                      <Link key={i} to={sub.path}>
                        <li
                          className={clsx(
                            "flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-colors",
                            "hover:bg-sidebar-hover dark:hover:bg-sidebar-hover-dark",
                            location.pathname === sub.path &&
                              "bg-sidebar-active dark:bg-sidebar-active-dark text-white",
                          )}
                        >
                          <FaCircle className="text-[5px]" />
                          <span className="truncate">{sub.title}</span>
                        </li>
                      </Link>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>

        {/* Developer Credit */}
        {open && (
          <div className="p-4 mt-4 border-t border-sidebar-border dark:border-sidebar-border-dark text-xs text-center text-sidebar-text/70 dark:text-sidebar-text-dark/70">
            Developed by <br />
            <a 
              href="https://rafiulabeerkhan.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary-500 font-semibold hover:underline mt-1 inline-block"
            >
              rafiulabeerkhan
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
