import React from "react";
// import "./index.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { DashboardTabs } from "../Components/DashboardTabs";

// import Sidebar from "../Components/Sidebar";

export const Dashboard = () => {
  return (
    <>
      <div className="flex">
        <main className="flex-1">
          <Navbar />
          <DashboardTabs />
          <Footer />
        </main>
      </div>
    </>
  );
};
