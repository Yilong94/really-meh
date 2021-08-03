import { FC } from "react";

import * as routes from "../../app/routes";
import BreadCrumb from "../../components/BreadCrumb";
import NewPollForm from "../../components/NewPollForm";

const NewPollPage: FC = () => {
  return (
    <div className="flex flex-col flex-auto min-h-0 overflow-y-auto">
      <BreadCrumb crumbs={[routes.HOME, routes.NEW_POLL]} />
      <NewPollForm />
    </div>
  );
};

export default NewPollPage;
