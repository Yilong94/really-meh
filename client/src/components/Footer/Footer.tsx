import { FC } from "react";

import ResponsiveContainer from "../ResponsiveContainer";

export const Footer: FC = () => {
  return (
    <div className="bg-black">
      <ResponsiveContainer className="flex items-center h-4 p-4">
        <div className="text-xs text-white">HackWeek 2021: ReallyMeh?</div>
      </ResponsiveContainer>
    </div>
  );
};

export default Footer;
