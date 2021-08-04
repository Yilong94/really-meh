import { FC } from "react";

import { OfficialStatement } from "../../entities/OfficialStatement";
import OfficialStatementsCarousel from "../OfficialStatementsCarousel";
import ResponsiveContainer from "../ResponsiveContainer";

const officialStatements: OfficialStatement[] = [
  {
    statement: "False COVID remedies circulating on Whatsapp",
    ministry: "Ministry of Health",
  },
  {
    statement: "False COVID remedies circulating on Whatsapp",
    ministry: "Ministry of Health",
  },
  {
    statement: "False COVID remedies circulating on Whatsapp",
    ministry: "Ministry of Health",
  },
  {
    statement: "False COVID remedies circulating on Whatsapp",
    ministry: "Ministry of Health",
  },
];

const OfficialStatementsSection: FC = () => {
  return (
    <ResponsiveContainer className="p-4 mt-2 bg-white">
      <div className="text-base font-bold">Fake News</div>
      <div className="text-xs">
        Current debunked fake news that have been circulating in Singapore.
      </div>
      <OfficialStatementsCarousel officialStatements={officialStatements} />
    </ResponsiveContainer>
  );
};

export default OfficialStatementsSection;
