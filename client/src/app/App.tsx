import React from "react";
import { Switch, Route } from "react-router-dom";

import Header from "../components/Header";
import HomePage from "../pages/HomePage";

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </>
  );
};

export default App;
