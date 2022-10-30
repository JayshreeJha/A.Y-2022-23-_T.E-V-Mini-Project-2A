import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import { FcCheckmark, FcLock } from "react-icons/fc";

import "../Components/styleCoursePanel.css";

// import { DataCourses } from "../Components/DataCourses";
import { useSelector, useDispatch } from "react-redux";
import { updateCompletion } from "../features/Data/fetchData";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
// import remarkToc from "remark-toc";
// import remarkHighlightjs from 'remark-highlight.js';
import rehypeRaw from "rehype-raw";
// import rehypeSanitize from "rehype-sanitize";
import { userSelector } from "../features/Data/fetchData";
import { useLocation } from "react-router-dom";
import { QuizPanel } from "../Components/QuizPanel";
export const CoursePanel = (props) => {
  const { courseData } = useSelector(userSelector);
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [markdownPage, setMdPage] = useState(null);
  const [markdown, setMarkdown] = useState("");
  const [show, setShow] = useState(false);
  const [btnClick, setbtnClick] = useState(false);
  //quiz
  const [quizJsonLink, setQuizJsonLink] = useState(null);
  const [quizJson, setQuizJson] = useState("");
  const [quizMode, setQuizMode] = useState(false);

  // setQuizAccess
  const [quizAccess, setQuizAccess] = useState(false);
  const [quizIndex, setQuizIndex] = useState(null);

  // const [marks, setMarks] = useState(0);

  // const [completion, setCompletion] = useState(false);
  const setbtnFunc = () => setbtnClick(!btnClick);
  const setQuizFunc = (e) => {
    // setQuizMode(true);
    setQuizJsonLink(e);
    // updateCompletionFunc(e);
    setQuizIndex(e);
  };
  const setPageFunc = (e) => {
    setQuizMode(false);
    setQuizJson("");
    setQuizJsonLink(null);
    // setQuizIndex(null);
    setMdPage(e);
    updateCompletionFunc(e);
  };
  // var Markdown = require("../Content/1.md");

  useEffect(() => {
    if (pathName) checkAccessToFinalQuiz();
  }, [quizJsonLink, markdownPage]);
  useEffect(() => {
    if (courseData) {
      // console.log(courseData.Index);
      setData(courseData.Index);
      const excludeFinal =
        Object.keys(courseData.Index)[0] == "Final"
          ? Object.keys(courseData.Index)[1]
          : Object.keys(courseData.Index)[0];
      const firstElement = courseData.Index[excludeFinal][0].key;
      setMdPage(firstElement);
    }
  }, [courseData]);

  const location = useLocation();
  const [pathName, setPathName] = useState(null);

  async function checkAccessToFinalQuiz() {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_API}course/check${pathName}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
          "x-access-tokens": localStorage.getItem("token"),
        },
        body: JSON.stringify({}),
      }
    );

    // let data = await response.json();

    if (response.status === 200) {
      setQuizAccess(true);
    } else {
      setQuizAccess(false);
    }
  }

  useEffect(() => {
    if (location) {
      let tmp = location.pathname.slice(
        location.pathname.lastIndexOf("/"),
        location.pathname.length
      );
      setPathName(tmp);
    }
  }, [location]);

  async function getMarkdown() {
    let response = await fetch(
      `${process.env.REACT_APP_BACKEND_API}md/${markdownPage}`,
      {
        headers: {
          "Cache-Control": "no-cache",
          "x-access-tokens": localStorage.getItem("token"),
        },
      }
    );

    let data = await response.text();

    if (response.status === 200) {
      setMarkdown(data);
      console.log(data);
    }

    // .then((response) => response.text())
    // .then((text) => {
    //   setMarkdown(text);
    //   console.log(text);
    // });
  }

  useEffect(() => {
    // console.log(markdownPage);
    if (markdownPage) getMarkdown();
  }, [markdownPage]);

  useEffect(() => {
    // console.log(markdownPage);
    if (quizJsonLink)
      fetch(`${process.env.REACT_APP_BACKEND_API}json/${quizJsonLink}`, {
        headers: {
          "x-access-tokens": localStorage.getItem("token"),
        },
      })
        .then((response) => response.text())
        .then((text) => {
          setQuizJson(text);
          setQuizMode(true);
          // console.log(text);
        });
  }, [quizJsonLink]);

  useEffect(() => {
    if (markdown) setShow(true);
    // console.log(markdown);
  }, [markdown]);

  useEffect(() => {
    // Fetch all the details element.
    const details = document.querySelectorAll("details");

    // Add the onclick listeners.
    details.forEach((targetDetail) => {
      targetDetail.addEventListener("click", () => {
        // Close all the details that are not targetDetail.
        details.forEach((detail) => {
          if (detail !== targetDetail) {
            detail.removeAttribute("open");
          }
        });
      });
    });
  }, [btnClick]);

  const updateCompletionFunc = (indexkey) => {
    let token = localStorage.getItem("token");
    if (pathName) {
      dispatch(
        updateCompletion({ token: token, key: indexkey, courselink: pathName })
      );
    }
    // setCompletion(true);
  };

  const handleQuizSubmit = () => {
    // setMarks(e);
    updateCompletionFunc(quizIndex);
  };
  // eslint-disable-next-line no-unused-vars
  const loadIndex = () => {
    let list = [];
    // let keys = Object.keys(data);
    if (data) {
      for (const k in data) {
        {
          // skip final quiz json key
          if (k === "Final") {
            continue;
          }
          list.push(
            <li key={k} className="nav-item mb-2">
              <details className="group" onClick={setbtnFunc}>
                <summary className=" hover:text-purple-600 truncate flex items-center justify-between rounded-lg cursor-pointer bg-gray-50">
                  <h5 className="nav-link text-purple-800 text-gray-900">
                    <span className="fa fa-list-alt mr-2"></span>
                    {k}
                  </h5>

                  <svg
                    className="flex-shrink-0 ml-1.5 w-5 h-5 transition duration-300 group-open:-rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <ul>
                  {data[k].map((item, index) => {
                    return (
                      <li key={index} className="nav-item">
                        {item.title == "Quiz" ? (
                          <a
                            className={
                              data[k].locked
                                ? "nav-link pointer-events-none flex  justify-between  text-purple-400 hover:text-purple-600"
                                : "nav-link  flex  justify-between  text-purple-400 hover:text-purple-600"
                            }
                            onClick={() => setQuizFunc(item.key)}
                          >
                            <span className="fa fa-chart-bar ml-2">
                              {item.title}
                            </span>
                            {item.completion ? <FcCheckmark /> : ""}
                          </a>
                        ) : (
                          <a
                            className={
                              data[k].locked
                                ? "nav-link pointer-events-none flex  justify-between  text-purple-400 hover:text-purple-600"
                                : "nav-link  flex  justify-between  text-purple-400 hover:text-purple-600"
                            }
                            onClick={() => setPageFunc(item.key)}
                          >
                            <span className="fa fa-chart-bar ml-2">
                              {item.title}
                            </span>
                            {item.completion ? <FcCheckmark /> : ""}
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </details>
            </li>
          );
        }
      }
    }
    return list;
  };
  return (
    <>
      {show ? (
        <>
          <div className="container  mx-auto">
            <div className="flex  flex-row flex-wrap py-4">
              <aside className=" border-solid md:border-r-[1px]   border-black w-full sm:w-1/3 md:w-1/4 px-2">
                <div className="sticky top-0 p-4 w-full">
                  {/* <!-- navigation --> */}
                  <ul className="nav flex flex-col overflow-hidden">
                    {loadIndex()}
                    <li key={"Final"} className="nav-item mb-2">
                      <a
                        className={
                          data["Final"][0].completion
                            ? "nav-link flex  justify-between  text-purple-400 hover:text-purple-600"
                            : "nav-link  flex  justify-between  text-purple-600 hover:text-purple-600"
                        }
                        onClick={
                          quizAccess
                            ? () => setQuizFunc(data["Final"][0].key)
                            : () => console.log("false")
                        }
                      >
                        <span className="fa fa-chart-bar ml-2">
                          {data["Final"][0].title}
                        </span>
                        {data["Final"][0].completion ? <FcCheckmark /> : ""}
                        {quizAccess ? "" : <FcLock />}
                      </a>
                    </li>
                  </ul>
                </div>
              </aside>
              <main
                role="main"
                className=" md:pl-9  w-full sm:w-2/3 md:w-3/4 pt-1 px-2"
              >
                <div className="float-right">
                  <button
                    onClick={(e) => props.tongle(e)}
                    className="inline-flex items-center p-2 text-white bg-indigo-600 border border-indigo-600 rounded hover:bg-transparent hover:text-indigo-600 active:text-indigo-500 focus:outline-none focus:ring"
                  >
                    Back
                  </button>
                </div>

                {quizMode ? (
                  <QuizPanel
                    data={quizJson}
                    result={handleQuizSubmit}
                    path={pathName}
                  />
                ) : (
                  <ReactMarkdown
                    className="prose  max-w-none"
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                  >
                    {markdown}
                  </ReactMarkdown>
                )}
              </main>
            </div>
          </div>
          <Footer />
        </>
      ) : (
        ""
      )}
    </>
  );
};
