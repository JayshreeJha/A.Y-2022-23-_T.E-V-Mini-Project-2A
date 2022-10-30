import React from "react";
// import "./index.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Intro from "../Components/Intro";
// import { CardCourse } from "../Components/CardCourse";
import { CardFLow } from "../Components/CardFLow";
import { SectionStats } from "../Components/SectionStats";
import { Testimonials } from "../Components/Testimonials";
// import Sidebar from "../Components/Sidebar";
// import { fetchData } from "../features/Data/fetchData";

const Home = (props) => {
  return (
    <>
      <div className="flex">
        <main className="flex-1">
          <Navbar data={props.data} />
          <Intro />
          <CardFLow />
          <SectionStats />
          <Testimonials />
          <Footer />
        </main>
      </div>
    </>
  );
};
export default Home;
