import { useEffect, useState } from "react";
import useCategory from "../../../hooks/useCategory";
import navbarConfig from "../../../config/navbarConfig";

const Navbar = ({ handleNavClick, mobile = false }) => {
  const { getAllCategories } = useCategory();
  const [categories, setCategories] = useState([]);
  const categoryItems = categories.map((category) => ({
    key: `category-${category.id}`,
    title: category.name,
    type: "category",
    path: `/${category.slug}`,
    slug: category.slug,
  }));
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getAllCategories({
        page: 1,
        limit: 100,
        search: "",
      });

      if (res.success) {
        setCategories(res.data.data.data);
      }
    };

    fetchCategories();
  }, []);

  const navItems = [
    ...navbarConfig.slice(0, 2),
    ...categoryItems,
    ...navbarConfig.slice(2),
  ];

  return (
    <ul
      className={
        mobile
          ? "flex flex-col w-full gap-1"
          : "hidden md:flex items-center gap-8"
      }
    >
      {navItems.map((item) => (
        <li
          key={item.id || item.key}
          className={`group relative ${
            mobile ? "w-full border-b border-slate-100 last:border-none" : ""
          }`}
        >
          <button
            onClick={() => handleNavClick(item)}
            className={`
              transition-all duration-300
              ${
                mobile
                  ? "w-full text-left py-3 px-2 text-base font-medium text-slate-700 hover:bg-slate-100 hover:text-primary-600 rounded-lg"
                  : "relative py-2 text-sm font-semibold text-slate-600 hover:text-primary-600"
              }
            `}
          >
            {item.title || item.name}
          </button>

          {!mobile && (
            <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-primary-600 transition-all duration-300 group-hover:w-full" />
          )}
        </li>
      ))}
    </ul>
  );
};

export default Navbar;
