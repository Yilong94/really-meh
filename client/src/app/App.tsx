import React, { FC } from "react";
import { Switch, Route } from "react-router-dom";

import Header from "../components/Header";
import HomePage from "../pages/HomePage";

const App: FC = () => {
  return (
    <div className="bg-gray-200 h-full">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </div>
  );
};

export default App;
