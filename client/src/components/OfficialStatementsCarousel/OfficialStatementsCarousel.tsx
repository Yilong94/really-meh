import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { useQuery } from "react-query";

import { fetchOfficialStatements } from "../../api/api";
import { ReactQueryKey } from "../../constants/constants";
import { OfficialStatement } from "../../entities/OfficialStatement";
import OfficialStatementsCarouselItem from "../OfficialStatementsCarouselItem";

interface Props {
  officialStatements: OfficialStatement[];
}

const OfficialStatementsCarousel: FC<Props> = ({ officialStatements }) => {
  const { isLoading, data } = useQuery(
    ReactQueryKey.OFFICIAL_STATEMENTS,
    fetchOfficialStatements
  );

  return (
    <div
      className={`h-40 flex justify-center items-${
        isLoading ? "center" : "stretch"
      }`}
    >
      {isLoading ? (
        <FontAwesomeIcon icon={faSpinner} className="w-5 h-5 animate-spin" />
      ) : (
        <div className="flex my-2 overflow-x-auto space-x-2">
          {officialStatements.map(({ statement, ministry }, index) => {
            return (
              <OfficialStatementsCarouselItem
                key={index}
                statement={statement}
                ministry={ministry}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OfficialStatementsCarousel;
