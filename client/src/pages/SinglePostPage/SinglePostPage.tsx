import { FC } from "react";

import * as routes from "../../app/routes";
import BreadCrumb from "../../components/BreadCrumb";
import SinglePostSection from "../../components/SinglePostSection";

const SinglePostPage: FC = () => {
  return (
    <div className="flex flex-col flex-auto min-h-0 overflow-y-auto">
      <BreadCrumb crumbs={[routes.HOME, routes.POST]} />
      <SinglePostSection />
    </div>
  );
};

export default SinglePostPage;
