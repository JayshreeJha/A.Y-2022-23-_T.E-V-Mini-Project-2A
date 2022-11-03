import React from "react";

// components

export default class AddCourse extends React.Component {
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
      rate: this.state.rate,
      tags: this.state.tags,
      views: 0,
      price: this.state.Price,
      category: this.state.Category,
    };

    this.props.data(final);
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
    if (data === "text") this.setState({ text: e.target.value });
    if (data === "title") this.setState({ title: e.target.value });
    if (data === "dis") this.setState({ dis: e.target.value });
    if (data === "tags") this.setState({ tags: e.target.value });
    if (data === "link") this.setState({ link: e.target.value });
    if (data === "rate") this.setState({ rate: e.target.value });
    if (data === "Price") this.setState({ Price: e.target.value });
    if (data === "Category") this.setState({ Category: e.target.value });
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
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold">
                Add Course
              </h6>
              <button
                onClick={this.finalSubmit}
                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
              >
                Add
              </button>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form>
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Course Information
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={this.state.title}
                      onChange={(e) => this.textHandler(e, "title")}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Price
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={this.state.Price}
                      onChange={(e) => this.textHandler(e, "Price")}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Category
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={this.state.Category}
                      onChange={(e) => this.textHandler(e, "Category")}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      link
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={this.state.link}
                      onChange={(e) => this.textHandler(e, "link")}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Tag
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={this.state.tags}
                      onChange={(e) => this.textHandler(e, "tags")}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
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
                </div>

                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Author
                    </label>
                    <input
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={this.state.text}
                      type="text"
                      placeholder="Text input"
                      onChange={(e) => this.textHandler(e, "text")}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-3/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Author Image
                    </label>
                    <input
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      id="instructorImage"
                      type="file"
                      value={this.state.file}
                      multiple
                      onChange={this.fileSelectedHandlerForInstructor}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-3/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      {" "}
                      add{" "}
                    </label>
                    <button
                      onClick={this.add}
                      className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Image
                  </label>
                  <input
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    id="fileupload"
                    type="file"
                    multiple
                    onChange={this.fileSelectedHandler}
                  />
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Description
                    </label>
                    <textarea
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      rows="4"
                      value={this.state.dis}
                      onChange={(e) => this.textHandler(e, "dis")}
                    ></textarea>
                  </div>
                </div>
              </div>

              <hr className="mt-6 border-b-1 border-blueGray-300" />

              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Instructor Preview
              </h6>
              {this.state.Instructors.map((item, index) => (
                <div
                  key={index}
                  className="sticky inset-x-0 bottom-0 border-t border-gray-100"
                >
                  <a
                    href="#hey"
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
              <hr className="mt-6 border-b-1 border-blueGray-300" />

              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Image Preview
              </h6>
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
            </form>
          </div>
        </div>
      </>
    );
  }
}
