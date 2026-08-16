import React from "react";

const Login = React.lazy(() => import("../pages/auth/Login"));
const Categories = React.lazy(() => import("../pages/Categories/Categories"));
const AdminDashboard = React.lazy(() => import("../pages/Dashboard/AdminDashboard"));
const ModeratorDashboard = React.lazy(() => import("../pages/Dashboard/ModeratorDashboard"));
const ReporterDashboard = React.lazy(() => import("../pages/Dashboard/ReporterDashboard"));
const AccessDenied = React.lazy(() => import("../pages/Landing/AccessDenied"));
const LandingPage = React.lazy(() => import("../pages/Landing/LandingPage"));
const NewsPage = React.lazy(() => import("../pages/Landing/NewsPages/NewsPage"));
const SingleNewsPage = React.lazy(() => import("../pages/Landing/NewsPages/SingleNewsPage"));
const NotFound = React.lazy(() => import("../pages/Landing/NotFound"));
const Video = React.lazy(() => import("../pages/Landing/Videos/Video"));
const AddNews = React.lazy(() => import("../pages/News/AddNews"));
const AllNews = React.lazy(() => import("../pages/News/AllNews"));
const PublishVideos = React.lazy(() => import("../pages/PubishVideos/PublishVideos"));
const Settings = React.lazy(() => import("../pages/Settings/Settings"));
const Users = React.lazy(() => import("../pages/Users/Users"));

export const publicRoutes = [
  {
    path: "/",
    element: LandingPage,
  },
  {
    path: "/login",
    element: Login,
  },

  //Landing Page routes
  { path: "/video", element: () => <Video /> },

  {
    path: "/news/:slug",
    element: () => <SingleNewsPage />,
  },

  {
    path: "/:slug",
    element: () => <NewsPage />,
  },
];

const Empty = () => <div></div>;

export const protectedRoutes = [
  { path: "/dashboard/ADMIN", element: () => <AdminDashboard /> },
  { path: "/dashboard/MODERATOR", element: () => <ModeratorDashboard /> },
  { path: "/dashboard/REPORTER", element: () => <ReporterDashboard /> },
  { path: "/dashboard/news", element: () => <AllNews /> },
  { path: "/dashboard/news/create", element: () => <AddNews /> },
  { path: "/dashboard/news/create/:id", element: () => <AddNews /> },
  { path: "/dashboard/categories", element: () => <Categories /> },
  { path: "/dashboard/videos", element: () => <PublishVideos /> },
  { path: "/dashboard/users", element: () => <Users /> },
];

export const errorRoutes = [
  {
    path: "/unauthorized",
    element: AccessDenied,
  },
  {
    path: "*",
    element: NotFound,
  },
];
