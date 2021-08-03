import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

import ResponsiveContainer from "../ResponsiveContainer";

const Header: FC = () => {
  return (
    <div className="bg-white">
      <ResponsiveContainer className="flex justify-between h-16 p-4">
        <div className="flex content-center justify-center w-16 bg-gray-400">
          Logo
        </div>
        <div className="p-2">
          <button className="flex content-center justify-center">
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </ResponsiveContainer>
    </div>
  );
};

export default Header;
