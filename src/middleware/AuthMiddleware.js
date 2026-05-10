import { Navigate, Outlet } from "react-router";

const ROUTES = {
  LOGIN: "/user/login",
  DASHBOARD: "/dashboard",
};

const AUTH_TYPE = {
  PUBLIC: "public",
  PRIVATE: "private",
};

const AuthMiddleware = ({ type }) => {
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  const isPrivateRoute = type === AUTH_TYPE.PRIVATE;
  const isPublicRoute = type === AUTH_TYPE.PUBLIC;

  if (isPrivateRoute && !isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (isPublicRoute && isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <Outlet />;
};

export default AuthMiddleware;
