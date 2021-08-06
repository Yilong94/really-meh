import { FC } from "react";

import { OfficialStatement } from "../../entities/OfficialStatement";
import OfficialStatementsCarousel from "../OfficialStatementsCarousel";
import ResponsiveContainer from "../ResponsiveContainer";

const officialStatements: OfficialStatement[] = [
  {
    statement:
      "False statements on SST Facebook page on reporting of COVID-19 cases",
    ministry: "Ministry of Health",
  },
  {
    statement:
      "False rumour circulating that COVID-19 patients ran away from a hospital",
    ministry: "Ministry of Health",
  },
  {
    statement:
      "False rumours that Singapore will be going into lockdown next Monday (03/12/20)",
    ministry: "Ministry of Health",
  },
  {
    statement:
      "Fake news that all schools will close next Monday due to COVID-19 outbreak",
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
