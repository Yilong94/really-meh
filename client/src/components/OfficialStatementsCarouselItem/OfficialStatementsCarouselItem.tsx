import { FC } from "react";

import { OfficialStatement } from "../../entities/OfficialStatement";

type Props = OfficialStatement;

const OfficialStatementsCarouselItem: FC<Props> = ({ statement, ministry }) => {
  return (
    <div className="flex flex-col justify-between flex-none w-48 p-2 bg-white">
      <div className="">
        <div className="text-xs font-bold">OFFICIAL STATEMENT</div>
        <div className="text-sm">{statement}</div>
      </div>
      <div className="text-xs">By {ministry}</div>
    </div>
  );
};

export default OfficialStatementsCarouselItem;
