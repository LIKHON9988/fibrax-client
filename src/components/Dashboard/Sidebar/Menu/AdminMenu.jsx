import { FaUserClock, FaUserCog } from "react-icons/fa";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { TiThSmall } from "react-icons/ti";
import MenuItem from "./MenuItem";

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label="Manage Users" address="manage-users" />
      <MenuItem
        icon={FaUserClock}
        label="Approve requests"
        address="approve-requests"
      />
      <MenuItem
        icon={BsFillHouseDoorFill}
        label="All Products"
        address="all-products"
      />
      <MenuItem icon={TiThSmall} label="All Orders" address="All-orders" />
    </>
  );
};

export default AdminMenu;
