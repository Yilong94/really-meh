import { FC } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

import { LOGIN } from "../../app/routes";
import { getSessionToken } from "../../utils";

type Props = RouteProps;

const AuthRoute: FC<Props> = (props) => {
  const isUserLogin = !!getSessionToken();

  if (!isUserLogin) {
    return <Redirect to={{ pathname: LOGIN }} />;
  }

  return <Route {...props} />;
};

export default AuthRoute;
