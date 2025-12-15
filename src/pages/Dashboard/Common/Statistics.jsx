import AdminStatistics from "../../../components/Dashboard/Statistics/AdminStatistics";
import ManagerStatistics from "../../../components/Dashboard/Statistics/ManagerStatistics";
import BuyerStatistics from "../../../components/Dashboard/Statistics/BuyerStatistics";
import useRole from "../../../hooks/UseRole";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const Statistics = () => {
  const [role, isRefreshing] = useRole();

  if (isRefreshing) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div>
      {role === "Admin" && <AdminStatistics />}
      {role === "Manager" && <ManagerStatistics />}
      {role === "Buyer" && <BuyerStatistics />}
    </div>
  );
};

export default Statistics;
