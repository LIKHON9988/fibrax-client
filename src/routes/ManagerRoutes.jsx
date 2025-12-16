import { Navigate } from "react-router";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useRole from "../hooks/useRole";

const ManagerRoutes = ({ children }) => {
  const [role, isRefreshing] = useRole();

  if (isRefreshing) return <LoadingSpinner />;
  if (role === "Manager") return children;
  return <Navigate to="/" state={location.pathname} replace="true" />;
};

export default ManagerRoutes;
