import AuthMiddleware from "./middleware/AuthMiddleware";
import Fallback from "./components/Fallback";
import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router";

const Login = lazy(() => import("./page/login"));
const Dashboard = lazy(() => import("./page/dashboard"));

const routes = {
  public: [
    {
      path: "/user/login",
      element: <Login />,
    },
  ],

  private: [
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ],
};

const renderRoutes = (routes) =>
  routes.map(({ path, element }) => (
    <Route key={path} path={path} element={element} />
  ));

function App() {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route path="/" element={<Navigate to="/user/login" replace />} />

        <Route element={<AuthMiddleware type="public" />}>
          {renderRoutes(routes.public)}
        </Route>

        <Route element={<AuthMiddleware type="private" />}>
          {renderRoutes(routes.private)}
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
