import React, { useState } from "react";
import "./stylecourseinfo.css";
// import { DataCourses } from "./DataCourses";
// import { useHistory } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import Box from "@material-ui/core/Box";
// import Typography from "@material-ui/core/Typography";
import Stripe from "../Stripe/Stripe";
// import Button from "@material-ui/core/Button";
export const CourseInfo = (props) => {
  // const history = useHistory();

  const [data] = useState(props.data);
  const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false); // let data;
  // data = props.data;
  // console.log(data.tags);
  // data = DataCourses[0];

  const publicURL = `${process.env.REACT_APP_STATIC_API}static/`;
  const [mainPic, setPic] = useState(publicURL + "/images/" + data.image[0]);
  const setPicture = (e) => setPic(e);

  async function handleDownload() {
    let response = await fetch(
      `${process.env.REACT_APP_BACKEND_API}course/${props.data.link}/certificate`,
      {
        headers: {
          "Cache-Control": "no-cache",
          "x-access-tokens": localStorage.getItem("token"),
        },
      }
    );
    const data = await response.blob();

    if (response.status === 200) {
      const fileURL = window.URL.createObjectURL(data);
      // Setting various property values
      let alink = document.createElement("a");
      alink.href = fileURL;
      alink.download = "SamplePDF.pdf";
      alink.click();
    }
  }

  const enroll = (event) => {
    event.preventDefault();
    // props.enroll(event);
    setOpen(true);

    // props.enroll(event);
  };

  const changeEnroll = () => {
    props.enroll();
    setOpen(false);
  };

  const tongleToContent = (event) => {
    event.preventDefault();
    props.tongle(event);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const stars = () => {
    let content = [];
    for (let i = 1; i <= 5; i++) {
      content.push(
        <svg
          key={i}
          className={
            i <= data.rate ? "w-5 h-5 text-yellow-400" : "w-5 h-5 text-grey-200"
          }
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return content;
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stripe amount={"500"} feedback={changeEnroll} />
        </Box>
      </Modal>
      <section>
        <div className="relative max-w-screen-xl px-4 py-8 mx-auto">
          <div>
            <h1 className="text-2xl font-bold lg:text-3xl">{data.title}</h1>

            <div className="mt-1 text-sm text-gray-500">
              <div className="flex mt-2 -ml-0.5">
                Rating:
                {stars()}
                {"( " + data.views + " "}
                ratings{" )"}
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:items-start lg:grid-cols-4">
            <div className="lg:col-span-3">
              <div className="relative mt-4">
                <img
                  alt=""
                  src={mainPic}
                  className="w-full rounded-xl h-72 lg:h-[540px] object-cover"
                />
              </div>

              <ul className="flex gap-1 mt-1">
                {data.image.map((item, index) => {
                  return (
                    <li key={index}>
                      <a
                        onClick={() =>
                          setPicture(publicURL + "/images/" + item)
                        }
                      >
                        <img
                          className="object-cover w-16 h-16 rounded-md"
                          src={publicURL + "/images/" + item}
                          alt=""
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="lg:top-0 lg:sticky">
              <form className="space-y-4 lg:pt-8">
                <fieldset>
                  <legend className="text-lg font-bold">Instructor</legend>

                  <div className="flex flex-col mt-2 space-x-1">
                    {data.Instructors.map((item, index) => {
                      return (
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
                              src={
                                publicURL +
                                "/instructor/" +
                                item.instructorImage
                              }
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
                      );
                    })}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="text-lg font-bold">Tags</legend>

                  <div className="flex mt-2 space-x-1">
                    {data.tags.map((item, index) => {
                      return (
                        <label
                          key={index}
                          htmlFor="material_cotton"
                          className="cursor-pointer"
                        >
                          <span className="block px-3 py-1 text-xs border border-gray-200 rounded-full peer-checked:bg-gray-100">
                            {item}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="p-4 bg-gray-100 border rounded">
                  <p className="text-sm">
                    <span className="block">No ongoing offers</span>
                  </p>
                </div>

                <div>
                  <p className="text-xl font-bold">$19.99</p>
                </div>
                {/* <Link to={`/DevBootCamp/course/${data.link}/content`}> */}
                {props.enrollstatus ? (
                  <button
                    type="submit"
                    className="w-full px-6 py-3 text-sm font-bold tracking-wide text-white uppercase bg-red-700 rounded"
                    // onClick={() => history.push(`${data.link}/content`)}
                    onClick={tongleToContent}
                  >
                    Enrolled
                  </button>
                ) : (
                  <button
                    className="w-full px-6 py-3 text-sm font-bold tracking-wide text-white uppercase bg-red-700 rounded"
                    onClick={enroll}
                  >
                    Enroll
                  </button>
                )}
                {/* </Link> */}
                <button
                  type="button"
                  className="w-full px-6 py-3 text-sm font-bold tracking-wide uppercase bg-gray-100 border border-gray-300 rounded"
                >
                  Wishlist
                </button>

                {props.data.certification ? (
                  <button
                    type="button"
                    className="w-full px-6 py-3 text-sm font-bold tracking-wide uppercase bg-gray-100 border border-gray-300 rounded"
                    onClick={handleDownload}
                  >
                    Download Certificate
                  </button>
                ) : (
                  ""
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
