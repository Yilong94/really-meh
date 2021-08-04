import { FC } from "react";

import { OfficialStatement } from "../../entities/OfficialStatement";
import Pill from "../Pill";

type Props = OfficialStatement;

const OfficialStatementsCarouselItem: FC<Props> = ({ statement, ministry }) => {
  return (
    <div className="flex flex-col justify-between flex-none w-48 p-2 bg-white border-2 border-yellow-300 rounded-md">
      <div className="">
        <div className="text-xs font-bold">OFFICIAL STATEMENT</div>
        <div className="text-sm">{statement}</div>
      </div>
      <Pill classname="self-start" text={ministry} />
    </div>
  );
};

export default OfficialStatementsCarouselItem;
