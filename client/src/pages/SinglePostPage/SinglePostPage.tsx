import { FC } from "react";

import * as routes from "../../app/routes";
import BreadCrumb from "../../components/BreadCrumb";
import SinglePostSection from "../../components/SinglePostSection";

const SinglePostPage: FC = () => {
  return (
    <>
      <BreadCrumb crumbs={[routes.HOME, routes.POST]} />
      <SinglePostSection />
    </>
  );
};

export default SinglePostPage;
