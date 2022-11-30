import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = () => {
  const location = useLocation();
  return <Navigate to="/" state={{ from: location }} replace />;
  //   return <Outlet />;
};
export default RequireAuth;
