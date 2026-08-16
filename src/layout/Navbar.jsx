import { useEffect, useRef, useState } from "react";
import { FiLogOut, FiUser } from "react-icons/fi";
import { HiDotsVertical } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { useAuthStore } from "../store/authStore";

import navbarConfig from "../config/navbarConfig";

const Navbar = () => {
  const { authUser } = useAuthStore();
  const { logout } = useLogout();

  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);
  const navigate = useNavigate();

  const filteredMenus = navbarConfig
    .filter((menu) => menu.roles.includes(authUser?.role))
    .map((menu) => ({
      ...menu,
      subMenu: menu.subMenu.filter((sub) => sub.roles.includes(authUser?.role)),
    }));

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="
        w-full
        min-h-16

        bg-navbar-bg
        dark:bg-navbar-bg-dark

        text-navbar-text

        border-b
        border-navbar-border

        shadow-sm

        flex
        items-center
        justify-between

        px-6
        gap-4
      "
    >
      {/* Navigation Links */}
      <div className="hidden lg:flex items-center gap-6">
        {filteredMenus.map((menu) => (
          <button
            key={menu.key}
            onClick={() => navigate(menu.path)}
            className="
        text-sm
        font-medium
        hover:text-primary-500
        transition
      "
          >
            {menu.title}
          </button>
        ))}
      </div>
      {/* Profile */}

      <div ref={menuRef} className="relative shrink-0">
        <div
          onClick={() => setMenuOpen((prev) => !prev)}
          className="
            flex
            items-center
            gap-2

            px-2
            py-1

            rounded-xl

            border

            border-navbar-border

            cursor-pointer

            transition
          "
        >
          <div
            className="
              w-8
              h-8

              rounded-full

              bg-primary-500

              flex
              items-center
              justify-center

              text-white

              font-semibold
              text-sm
            "
          >
            {authUser?.name?.charAt(0)?.toUpperCase()}
          </div>

          <div
            className="
              hidden
              sm:flex
              flex-col
            "
          >
            <span
              className="
                text-sm
                font-medium
              "
            >
              {authUser?.name}
            </span>

            <span
              className="
                text-xs
                capitalize
              "
            >
              {authUser?.role}
            </span>
          </div>

          <HiDotsVertical />
        </div>

        <div
          className={`

            absolute

            right-0

            top-full

            mt-2

            w-48

            z-50

            rounded-lg

            bg-navbar-bg

            border

            shadow-lg


            ${
              menuOpen
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }


          `}
        >
          {authUser?.role !== "ADMIN" && (
            <button
              onClick={() => {
                setMenuOpen(false);

                navigate(`/${authUser?.role}/profile`);
              }}
              className="
                  w-full

                  flex
                  items-center
                  gap-2

                  px-4
                  py-2

                  text-sm
                "
            >
              <FiUser />
              Profile
            </button>
          )}

          <button
            onClick={() => {
              setMenuOpen(false);

              logout();
            }}
            className="
              w-full

              flex
              items-center
              gap-2

              px-4
              py-2

              text-sm

              text-danger
            "
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
