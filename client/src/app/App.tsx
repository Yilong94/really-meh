import React, { FC } from "react";
import { Switch, Route } from "react-router-dom";

import Header from "../components/Header";
import HomePage from "../pages/HomePage";
import NewPostPage from "../pages/NewPostPage";
import SinglePostPage from "../pages/SinglePostPage";

const App: FC = () => {
  return (
    <div className="flex flex-col h-full bg-gray-200">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/new-post" component={NewPostPage} />
        <Route path="/post/:id" component={SinglePostPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  );
};

export default App;
