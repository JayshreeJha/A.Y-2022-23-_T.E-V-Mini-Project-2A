import React from "react";
import CardTable from "../Cards/CardTable.js";

// components
/* raw
      Index: {
        "Week 1": [
          { title: "Prerequisite", key: 0 },
          { title: "Introduction", key: 1 },
          { title: "Quiz", key: "quiz1" },
        ],
        "Week 2": [
          { title: "Arrays and Looping", key: 2 },
          { title: "Varible Scope", key: 3 },
          { title: "Quiz", key: "quiz2" },
        ],
        "Week 3": [
          { title: "Es6 fuction", key: 4 },
          { title: "Async methods", key: 5 },
          { title: "Quiz", key: "quiz3" },
        ],
        Final: [{ title: "Final", key: "finalquiz" }],
      },
  */
export default class AddIndex extends React.Component {
  state = {
    header: "", //text
    title: "", //text
    key: "", //filename
    titleKey: [],
    markdown: [], //file
    json: "", //file
    finalQuiz: "", //file
    final: {}, //combine
    demo: ["a", "b"],
    notSubmitted: true,
  };
  finalSubmit() {
    let copy = this.state.final;
    copy["Final"] = [{ title: "Final", key: this.state.finalQuiz }];
    this.props.data(copy);
  }

  finalSubmit2() {
    console.log(this.state.key);

    let formData1 = new FormData();
    formData1.append("file", this.state.json);
    fetch(`${process.env.REACT_APP_BACKEND_API}upload/json`, {
      method: "POST",
      body: formData1,
    }).then((response) => {
      response.json().then((body) => {
        this.setState({
          json: body.names,
        });
        console.log(body.names);
      });
    });

    let formData2 = new FormData();
    formData2.append("file", this.state.finalQuiz);
    fetch(`${process.env.REACT_APP_BACKEND_API}upload/json`, {
      method: "POST",
      body: formData1,
    }).then((response) => {
      response.json().then((body) => {
        this.setState({
          finalQuiz: body.names,
        });
        console.log(body.names);
      });
    });

    let formData = new FormData();
    formData.append("file", this.state.key);
    fetch(`${process.env.REACT_APP_BACKEND_API}upload/markdown`, {
      method: "POST",
      body: formData,
    }).then((response) => {
      response.json().then((body) => {
        // this.setState({
        //   titleKey: [
        //     ...this.state.titleKey,
        //     { title: this.state.title, key: body.names },
        //   ],
        // });

        let copyFoo = [
          ...(this.state.titleKey ? this.state.titleKey : ""),
          { title: this.state.title, key: body.names },
        ]; //create a new copy
        this.setState({ titleKey: copyFoo }); //write it back to state

        console.log(body.names);
        this.setState({
          title: "", //text
          key: "", //filename
        });
      });
    });

    console.log("final");
  }

  finalSubmit3() {
    let copyFoo = { ...this.state.final }; //create a new copy
    copyFoo[this.state.header] = [
      ...(this.state.titleKey ? this.state.titleKey : ""),
      { title: "Quiz", key: this.state.json },
    ]; //change the value of bar
    this.setState({ final: copyFoo }); //write it back to state

    this.setState({
      title: "", //text
      header: "", //text
      key: "", //filename
      titleKey: [],
      json: "", //file
    });
  }

  textHandler = (e, data) => {
    if (data === "header") this.setState({ header: e.target.value });
    if (data === "title") this.setState({ title: e.target.value });
  };

  fileSelectedHandlerForMarkdown = (e) => {
    if (e.target.files && e.target.files[0]) {
      this.setState({ key: e.target.files[0] });
    }
  };

  fileSelectedHandlerForFinal = (e) => {
    if (e.target.files && e.target.files[0]) {
      this.setState({ finalQuiz: e.target.files[0] });
    }
  };

  fileSelectedHandlerForModuleQuiz = (e) => {
    if (e.target.files && e.target.files[0]) {
      this.setState({ json: e.target.files[0] });
    }
  };

  render() {
    return (
      <>
        <div className="w-full xl:w-6/12 mb-12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">
                  Add Index
                </h6>
                <div>
                  <button
                    onClick={() => this.finalSubmit2()}
                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Add SubHead
                  </button>
                  <button
                    onClick={() => this.finalSubmit3()}
                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Add Head
                  </button>
                  <button
                    onClick={() => this.finalSubmit()}
                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Index Information
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Header
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={this.state.header || ""}
                        onChange={(e) => this.textHandler(e, "header")}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Title
                      </label>
                      <input
                        type="email"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={this.state.title || ""}
                        onChange={(e) => this.textHandler(e, "title")}
                      />
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Markdown File
                      </label>
                      <input
                        type="file"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={this.fileSelectedHandlerForMarkdown}
                      />
                    </div>
                  </div>
                </div>
              </form>
              <form>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Module Quiz Information
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Json File
                      </label>
                      <input
                        type="file"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={this.fileSelectedHandlerForModuleQuiz}
                      />
                    </div>
                  </div>
                </div>
              </form>
              <form>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Final Quiz File
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Json File
                      </label>
                      <input
                        type="file"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={this.fileSelectedHandlerForFinal}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="w-full  xl:w-6/12 mb-12 px-4">
          {/* <h1>{this.state.header ? this.state.header : " none"}</h1> */}
          {Object.keys(this.state.final)
            ? Object.keys(this.state.final).map((index) => (
                <CardTable
                  key={index}
                  keyMain={index}
                  data={this.state.final[index]}
                />
              ))
            : ""}
        </div>
      </>
    );
  }
}
