import React, { FC } from "react";
import { Switch, Route } from "react-router-dom";

import Footer from "../components/Footer";
import Header from "../components/Header";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import NewPollPage from "../pages/NewPollPage";
import SignupPage from "../pages/SignUpPage";
import SinglePostPage from "../pages/SinglePostPage";

const App: FC = () => {
  return (
    <div className="flex flex-col h-full bg-gray-200">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/new-poll" component={NewPollPage} />
        <Route path="/post/:id" component={SinglePostPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/" component={HomePage} />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
