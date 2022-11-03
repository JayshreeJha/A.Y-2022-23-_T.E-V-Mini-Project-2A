import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Login from "./features/Users/Login";
import Signup from "./features/Users/Signup";
import Dashboard from "./features/Users/Dasshboard";
import { PrivateRoute } from "./helpers/PrivateRoute";

import { Dashboard as DashMain } from "./Pages/Dashboard";
import ScrollToTop from "./Components/ScrollToTop";
import { AddCourse } from "./Pages/AddCourse";
import Courseinfo from "./Pages/Course";
// import { QuizPanel } from "./Components/QuizPanel";
import { Categories } from "./Pages/Categories";
// import StripePaymentForm from "./Pages/StripePayment";
import Stripe from "./Stripe/Stripe";
import { ConfirmMail } from "./Pages/ConfirmMail";
// import "./assets/styles/tailwind.css";
import Admin from "./layouts/Admin.js";
export default class App extends Component {
  render() {
    return (
      <Router>
        <ScrollToTop />
        <div className="App">
          <Switch>
            {/* <Route path="/DevBootCamp/" exact element={<Home />} /> */}

            {/* <Route path="/DevBootCamp/:dynamic" component={NoMatch} /> */}
            {/* <Route exact component=QuizPanel path="/test" //> */}

            <Route exact component={Login} path="/DevBootCamp/login" />
            <Route exact component={Signup} path="/DevBootCamp/signup" />
            <Route exact component={Dashboard} path="/DevBootCamp" />
            <Route path="/DevBootCamp/category" component={Categories} />
            <Route path="/DevBootCamp/admin" component={Admin} />
            <Route
              exact
              path="/DevBootCamp/course/:dynamic"
              component={Courseinfo}
            />
            <PrivateRoute path="/DevBootCamp/dashboard" component={DashMain} />
            <PrivateRoute path="/DevBootCamp/add" component={AddCourse} />
            <PrivateRoute path="/DevBootCamp/test" component={Stripe} />
            <PrivateRoute
              path="/DevBootCamp/confirm/:mailtoken"
              component={ConfirmMail}
            />
            <Redirect from="/" to="/DevBootCamp/" />
          </Switch>
        </div>
      </Router>
    );
  }
}
