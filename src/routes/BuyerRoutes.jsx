import { Navigate } from "react-router";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useRole from "../hooks/useRole";

const BuyerRoutes = ({ children }) => {
  const [role, isRefreshing] = useRole();

  if (isRefreshing) return <LoadingSpinner />;
  if (role === "Buyer") return children;
  return <Navigate to="/" state={location.pathname} replace="true" />;
};

export default BuyerRoutes;
