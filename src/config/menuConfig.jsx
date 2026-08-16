import { MdDashboard } from "react-icons/md";

import {
  MdArticle,
  MdCategory,
  MdPeople,
  MdPhotoLibrary,
  MdSettings,
} from "react-icons/md";

const menuConfig = [
  {
    key: "dashboard",
    title: "Dashboard",
    path: "/dashboard/admin",
    icon: MdDashboard,
    roles: ["ADMIN"],
    subMenu: [],
  },
  {
    key: "dashboard",
    title: "Dashboard",
    path: "/dashboard/moderator",
    icon: MdDashboard,
    roles: ["MODERATOR"],
    subMenu: [],
  },
  {
    key: "dashboard",
    title: "Dashboard",
    path: "/dashboard/reporter",
    icon: MdDashboard,
    roles: ["REPORTER"],
    subMenu: [],
  },
  {
    key: "categories",
    title: "Categories",
    path: "/dashboard/categories",
    icon: MdCategory,
    roles: ["ADMIN"],
    subMenu: [],
  },
  {
    key: "news",
    title: "News",
    path: "/dashboard/news",
    icon: MdArticle,
    roles: ["ADMIN", "MODERATOR"],
    subMenu: [],
  },
  {
    key: "videos",
    title: "Publish Videos",
    path: "/dashboard/videos",
    icon: MdPhotoLibrary,
    roles: ["ADMIN"],
    subMenu: [],
  },
  {
    key: "users",
    title: "Users",
    path: "/dashboard/users",
    icon: MdPeople,
    roles: ["ADMIN"],
    subMenu: [],
  },
];

export default menuConfig;
