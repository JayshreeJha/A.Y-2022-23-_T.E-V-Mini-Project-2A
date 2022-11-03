import React from "react";

// components
import Loader from "react-loader-spinner";
import toast from "react-hot-toast";

import AddCourse from "../../Components/Cards/CardSettings.js";
import AddIndex from "../../Components/Cards/AddIndex";
// import CardProfile from "components/Cards/CardProfile.js";

export default class Settings extends React.Component {
  state = { data: {}, index: {}, page: false, loading: false };

  setDataF(e) {
    console.log(e);
    this.setState({ data: e, page: true });
  }

  setDataF2(e) {
    this.setState({
      loading: true,
    });

    console.log(e);
    let final = {
      ...this.state.data,
      Index: e,
    };

    console.log(final);
    this.submitjson(final);
  }

  componentDidUpdate() {
    if (this.state.index) {
      // this.submitjson();
    }
  }

  async submitjson(final) {
    // let final = {
    //   title: this.state.data.title,
    //   link: this.state.data.link,
    //   dis: this.state.data.dis,
    //   Instructors: this.state.data.newInstructors,
    //   image: this.state.data.newfiles,
    //   Index: this.state.index,
    //   rate: this.state.data.rate,
    //   tags: this.state.data.tags,
    //   views: 0,
    //   price: this.state.data.Price,
    //   category: this.state.data.Category,
    // };

    const response = await fetch(`${process.env.REACT_APP_BACKEND_API}course`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "x-access-tokens": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(final),
    });
    let data = await response.json();
    console.log("data", data);

    if (response.status === 200) {
      this.setState({
        loading: false,
      });
      toast.success("Course Added");
      console.log("sucess");
    } else {
      this.setState({
        loading: false,
      });
      toast.error("Try Later");
      console.log("fail");
    }
  }
  render() {
    return (
      <>
        {this.state.loading ? (
          <div className="flex items-center justify-center h-screen">
            <Loader type="Puff" color="#00BFFF" height={100} width={100} />
          </div>
        ) : (
          <div className="flex flex-wrap">
            {this.state.page ? (
              <AddIndex data={(e) => this.setDataF2(e)} />
            ) : (
              <AddCourse data={(e) => this.setDataF(e)} />
            )}
          </div>
        )}
      </>
    );
  }
}
