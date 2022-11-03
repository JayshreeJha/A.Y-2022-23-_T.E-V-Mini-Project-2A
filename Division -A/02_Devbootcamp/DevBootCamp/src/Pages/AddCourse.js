import React from "react";
// import { useState } from "react";

export class AddCourse extends React.Component {
  state = {
    files: [],
    Instructors: [],
    newfiles: "",
    newInstructors: "",
    image: "",
    text: "",
    amount: 1,
    title: "",
    tags: "",
    link: "",
    dis: "",
    rate: 0,
    Price: 0,
    Category: 0,
    notSubmitted: true,
  };

  submitImages = (e) => {
    console.log(e);
  };

  finalSubmit = (e) => {
    e.preventDefault();

    //upload process
    let formData = new FormData();
    let formDataforInstructor = new FormData();

    this.state.files.forEach((element) => {
      formData.append("file", element); //text
    });
    this.state.Instructors.forEach((element) => {
      formDataforInstructor.append("input", element.instructor); //text
      formDataforInstructor.append("file", element.instructorImage); //text
    });

    fetch(`${process.env.REACT_APP_BACKEND_API}upload/images`, {
      method: "POST",
      body: formData,
    }).then((response) => {
      response.json().then((body) => {
        this.setState({ newfiles: body.names });
        console.log(body.names);
      });
    });

    fetch(`${process.env.REACT_APP_BACKEND_API}upload/instructor`, {
      method: "POST",
      body: formDataforInstructor,
    }).then((response) => {
      response.json().then((body) => {
        this.setState({ newInstructors: body.Instructors });
        console.log(body.Instructors);
      });
    });
  };

  componentDidUpdate() {
    if (
      this.state.newfiles &&
      this.state.newInstructors &&
      this.state.notSubmitted
    ) {
      this.setState({
        files: [],
        Instructors: [],
        notSubmitted: false,
      });
      this.submitjson();
    }
  }

  async submitjson() {
    let final = {
      title: this.state.title,
      link: this.state.link,
      dis: this.state.dis,
      Instructors: this.state.newInstructors,
      image: this.state.newfiles,
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
      rate: this.state.rate,
      tags: this.state.tags,
      views: 0,
      price: this.state.Price,
      category: this.state.Category,
    };

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
      console.log("sucess");
    } else {
      console.log("fail");
    }
  }

  fileSelectedHandler = (e) => {
    this.setState({ files: [...this.state.files, ...e.target.files] });
  };

  clearFiles = (e) => {
    e.preventDefault();
    document.getElementById("fileupload").value = "";

    this.setState({ files: [] });
  };

  fileSelectedHandlerForInstructor = (e) => {
    if (e.target.files && e.target.files[0]) {
      this.setState({ image: e.target.files[0] });
    }
  };

  textHandler = (e, data) => {
    if (data == "text") this.setState({ text: e.target.value });
    if (data == "title") this.setState({ title: e.target.value });
    if (data == "dis") this.setState({ dis: e.target.value });
    if (data == "tags") this.setState({ tags: e.target.value });
    if (data == "link") this.setState({ link: e.target.value });
    if (data == "rate") this.setState({ rate: e.target.value });
    if (data == "Price") this.setState({ Price: e.target.value });
    if (data == "Category") this.setState({ Category: e.target.value });
  };

  add = (e) => {
    e.preventDefault();
    if (this.state.text && this.state.image) {
      this.setState({
        Instructors: [
          ...this.state.Instructors,
          {
            instructor: this.state.text,
            instructorImage: this.state.image,
          },
        ],
      });
      this.setState({ amount: this.state.amount + 1 });
    }
    document.getElementById("instructorImage").value = "";
    this.setState({ text: "", image: "" });
  };
  render() {
    return (
      <>
        <div className="p-4">
          <form action="">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Title
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Text input"
                value={this.state.title}
                onChange={(e) => this.textHandler(e, "title")}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Price
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Price"
                type="text"
                placeholder="Text input"
                value={this.state.Price}
                onChange={(e) => this.textHandler(e, "Price")}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Category
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Category"
                type="text"
                placeholder="Text input"
                value={this.state.Category}
                onChange={(e) => this.textHandler(e, "Category")}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                link
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Text input"
                value={this.state.link}
                onChange={(e) => this.textHandler(e, "link")}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Tags
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Text input"
                value={this.state.tags}
                onChange={(e) => this.textHandler(e, "tags")}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Rating
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="accountType"
                  value="1"
                  onChange={(e) => this.textHandler(e, "rate")}
                />
                <span className="ml-2">1</span>
              </label>
              <br />
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="accountType"
                  value="2"
                  onChange={(e) => this.textHandler(e, "rate")}
                />
                <span className="ml-2">2</span>
              </label>
              <br />

              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="accountType"
                  value="3"
                  onChange={(e) => this.textHandler(e, "rate")}
                />
                <span className="ml-2">3</span>
              </label>
              <br />

              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="accountType"
                  value="4"
                  onChange={(e) => this.textHandler(e, "rate")}
                />
                <span className="ml-2">4</span>
              </label>
              <br />

              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="accountType"
                  value="5"
                  onChange={(e) => this.textHandler(e, "rate")}
                />
                <span className="ml-2">5</span>
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Description
                <textarea
                  className="shadow form-textarea mt-1 block w-full border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows="5"
                  placeholder="Textarea"
                  value={this.state.dis}
                  onChange={(e) => this.textHandler(e, "dis")}
                ></textarea>
              </label>
            </div>

            <input
              id="fileupload"
              type="file"
              multiple
              onChange={this.fileSelectedHandler}
            />
            <button onClick={this.clearFiles}>clear</button>
            <div className="max-w-6xl mx-auto flex flex-wrap ">
              {this.state.files.map((imageSrc, key) => (
                <div key={key} className="w-1/1 sm:w-1/2 md:w-1/3 p-4">
                  <img
                    src={URL.createObjectURL(imageSrc)}
                    alt="not fount"
                    width={"250px"}
                  />
                </div>
              ))}
            </div>

            {/* Instructor */}
            <div className="mb-4 w-full">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Title
              </label>

              <div className="flex flex-wrap flex-row">
                <input
                  className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  value={this.state.text}
                  type="text"
                  placeholder="Text input"
                  onChange={(e) => this.textHandler(e, "text")}
                />
                <input
                  id="instructorImage"
                  type="file"
                  value={this.state.file}
                  multiple
                  onChange={this.fileSelectedHandlerForInstructor}
                />
              </div>
              <div>
                {this.state.Instructors.map((item, index) => (
                  <div
                    key={index}
                    className="sticky inset-x-0 bottom-0 border-t border-gray-100"
                  >
                    <a
                      href=""
                      className="flex items-center p-4 bgWhite hover:bg-gray-50 shrink-0"
                    >
                      <img
                        className="object-cover w-10 h-10 rounded-full"
                        src={URL.createObjectURL(item.instructorImage)}
                        alt="Simon Lewis"
                      />

                      <div className="ml-1.5">
                        <p className="text-xs">
                          <strong className="block font-medium">
                            {item.instructor}
                          </strong>
                        </p>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
              <button
                onClick={this.add}
                className="border-solid border-2 border-black-500 bg-cyan-500 hover:bg-cyan-600 rounded-full py-2 px-3 text-gray-700 w-10 h-10"
              >
                +
              </button>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={this.finalSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}
