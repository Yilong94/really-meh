import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

const Header: FC = () => {
  return (
    <div className="flex justify-between h-16 p-4 border-b border-gray-400">
      <div className="flex content-center justify-center w-16 bg-gray-400">
        Logo
      </div>
      <div className="p-2">
        <button className="flex content-center justify-center">
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
    </div>
  );
};

export default Header;
