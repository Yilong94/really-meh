import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

const Header: FC = () => {
  return (
    <div className="h-16 p-4 border-b border-gray-400 flex justify-between ">
      <div className="w-16 bg-gray-400 flex justify-center content-center">
        Logo
      </div>
      <div className="p-2">
        <button className="flex justify-center content-center">
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
    </div>
  );
};

export default Header;
