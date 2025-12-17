import { BsFingerprint } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import { FaLocationCrosshairs } from "react-icons/fa6";
import MenuItem from "./MenuItem";
import { useState } from "react";
import BecomeManagerModal from "../../../Modal/BecomeManagerModal";
const BuyerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <MenuItem icon={BsFingerprint} label="My Orders" address="my-orders" />
      <MenuItem
        icon={FaLocationCrosshairs}
        label="Track Order"
        address="track-orders"
      />

      <div
        onClick={() => setIsOpen(true)}
        className="flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-white  hover:bg-purple-500   hover:text-white cursor-pointer"
      >
        <GrUserAdmin className="w-5 h-5" />

        <span className="mx-2 font-medium">Become a Manager</span>
      </div>

      <BecomeManagerModal closeModal={closeModal} isOpen={isOpen} />
    </>
  );
};

export default BuyerMenu;
