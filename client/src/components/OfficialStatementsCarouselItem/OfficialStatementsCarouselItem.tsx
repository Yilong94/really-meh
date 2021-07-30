import { FC } from "react";

import { OfficialStatement } from "../../entities/OfficialStatement";

type Props = OfficialStatement;

const OfficialStatementsCarouselItem: FC<Props> = ({ statement, ministry }) => {
  return (
    <div className="p-2 w-48 bg-white flex-none flex flex-col justify-between">
      <div className="">
        <div className="text-xs font-bold">OFFICIAL STATEMENT</div>
        <div className="text-sm">{statement}</div>
      </div>
      <div className="text-xs">By {ministry}</div>
    </div>
  );
};

export default OfficialStatementsCarouselItem;
