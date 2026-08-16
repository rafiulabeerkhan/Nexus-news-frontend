import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

import { useAuthStore } from "../store/authStore";
import ErrorBoundary from "../components/layout/ErrorBoundary";
import Layout from "../layout/Main";
import PageLoader from "../components/PageLoader";
import {
  publicRoutes,
  protectedRoutes,
  errorRoutes,
} from "../config/routeConfig";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, authUser } = useAuthStore();
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return children;
};

import React, { Suspense } from "react";

const AppRoutes = () => {
  const { isLoggedIn, authUser } = useAuthStore();

  return (
    <Router>
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {publicRoutes.map(({ path, element: Element }) => (
              <Route
                key={path}
                path={path}
                element={
                  isLoggedIn &&
                  (path === "/" || path === "/login" || path === "/register") ? (
                    <Navigate to={`/dashboard/${authUser?.role}`} replace />
                  ) : (
                    <Element />
                  )
                }
              />
            ))}

            <Route
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              {protectedRoutes.map(({ path, element: Element }) => (
                <Route key={path} path={path} element={<Element />} />
              ))}
            </Route>

            {errorRoutes.map(({ path, element: Element }) => (
              <Route key={path} path={path} element={<Element />} />
            ))}
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
};

export default AppRoutes;
