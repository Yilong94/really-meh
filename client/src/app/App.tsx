import React, { FC } from "react";
import { Switch, Route } from "react-router-dom";

import AuthRoute from "../components/AuthRoute";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import NewPollPage from "../pages/NewPollPage";
import SignupPage from "../pages/SignUpPage";
import SinglePostPage from "../pages/SinglePostPage";

const App: FC = () => {
  return (
    <div className="flex flex-col h-full bg-gray-200 font-poppins">
      <Header />
      <Switch>
        <AuthRoute exact path="/" component={HomePage} />
        <AuthRoute exact path="/new-poll" component={NewPollPage} />
        <AuthRoute path="/post/:id" component={SinglePostPage} />

        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignupPage} />

        <AuthRoute path="/" component={HomePage} />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
