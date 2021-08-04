import { FC } from "react";
import { Link } from "react-router-dom";

import * as routes from "../../app/routes";
import ResponsiveContainer from "../ResponsiveContainer";

interface Props {
  crumbs: string[];
}

const BreadCrumb: FC<Props> = ({ crumbs }) => {
  if (crumbs.length === 0) {
    return null;
  }

  const lastCrumb = crumbs.slice(-1)[0];
  const allCrumbsExceptLast = crumbs.slice(0, -1);

  return (
    <ResponsiveContainer className="flex items-center px-4 py-2 mt-2 bg-white">
      {allCrumbsExceptLast.map((crumb, index) => {
        return (
          <>
            <Link key={index} className="text-xs underline" to={crumb}>
              {routes.routePageNameMap[crumb]}
            </Link>
            <span>&nbsp;/&nbsp;</span>
          </>
        );
      })}

      <span className="text-xs">{routes.routePageNameMap[lastCrumb]}</span>
    </ResponsiveContainer>
  );
};

export default BreadCrumb;
