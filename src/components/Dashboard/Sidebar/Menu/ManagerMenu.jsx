import { MdAddComment } from "react-icons/md";
import { MdHomeWork, MdOutlineManageHistory } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import MenuItem from "./MenuItem";
const ManagerMenu = () => {
  return (
    <>
      <MenuItem icon={MdAddComment} label="Add Product" address="add-product" />
      <MenuItem
        icon={MdHomeWork}
        label="Manage Products"
        address="manage-products"
      />
      <MenuItem
        icon={MdOutlineManageHistory}
        label="Manage Orders"
        address="manage-orders"
      />
      <MenuItem
        icon={FaCheckCircle}
        label="Approved Orders"
        address="approved-orders"
      />
      <MenuItem
        icon={FaClock}
        label="Pending Orders"
        address="pending-orders"
      />
    </>
  );
};

export default ManagerMenu;
