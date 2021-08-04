import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

import { ReactComponent as Logo } from "../../assets/images/logo.svg";
import ResponsiveContainer from "../ResponsiveContainer";

const Header: FC = () => {
  return (
    <div className="bg-white">
      <ResponsiveContainer className="flex items-center justify-between h-16 px-4 py-2">
        <Logo className="max-h-12" />
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
