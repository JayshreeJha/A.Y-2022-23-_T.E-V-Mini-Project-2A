import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "../Components/Navbars/AdminNavbar.js";
import Sidebar from "../Components/Sidebar/Sidebar.js";
import HeaderStats from "../Components/Headers/HeaderStats.js";

// views

import Dashboard from "../views/admin/Dashboard.js";
// import Maps from "views/admin/Maps.js";
import Settings from "../views/admin/Settings.js";
// import Tables from "../views/admin/Tables.js";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "../assets/styles/tailwind.css";

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        {window.location.href.indexOf("/DevBootCamp/admin/dashboard") !== -1 ? (
          <HeaderStats />
        ) : (
          <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
            <div className="px-4 md:px-10 mx-auto w-full"></div>
          </div>
        )}
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route
              path="/DevBootCamp/admin/dashboard"
              exact
              component={Dashboard}
            />
            <Route path="/DevBootCamp/admin/add" exact component={Settings} />
            <Route
              path="/DevBootCamp/admin/logout"
              exact
              component={Settings}
            />
            <Route path="/DevBootCamp/admin/data" exact component={Settings} />
            <Redirect
              from="/DevBootCamp/admin"
              to="/DevBootCamp/admin/dashboard"
            />
          </Switch>
        </div>
      </div>
    </>
  );
}
