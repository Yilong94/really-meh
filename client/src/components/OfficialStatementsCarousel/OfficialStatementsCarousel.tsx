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
        <FontAwesomeIcon icon={faSpinner} className="animate-spin h-5 w-5" />
      ) : (
        <div className="flex overflow-x-auto space-x-2 my-2">
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
