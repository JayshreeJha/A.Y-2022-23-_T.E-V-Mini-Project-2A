import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer";
// import { FaLock } from "react-icons/fa";

import "../Components/styleCoursePanel.css";

// import { DataCourses } from "../Components/DataCourses";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { useSelector } from "react-redux";
import {
  userSelector,
  // clearState,
} from "../features/Data/fetchData";
export const CoursePanel = () => {
  const { courseData } = useSelector(userSelector);

  const [data, setData] = useState(null);
  const [markdownPage, setMdPage] = useState(null);
  const [markdown, setMarkdown] = useState("");
  const [show, setShow] = useState(false);
  const [btnClick, setbtnClick] = useState(false);
  const setbtnFunc = () => setbtnClick(!btnClick);
  const setPageFunc = (e) => setMdPage(e);
  // var Markdown = require("../Content/1.md");

  async function loadmarkdown() {
    const file = await fetch(`${process.env.REACT_APP_BACKEND_API}md/1`);
    const text = await file.text();
    console.log(text);
    setMarkdown(text);
  }

  useEffect(() => {
    if (courseData) {
      console.log(courseData.Index);
      setData(courseData.Index);
      setPageFunc(1);
    }
  }, []);

  useEffect(() => {
    if (markdownPage) loadmarkdown;
    console.log(markdownPage);
  }, [markdownPage]);

  useEffect(() => {
    if (markdown) setShow(true);
    console.log(markdown);
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

  // eslint-disable-next-line no-unused-vars
  const loadIndex = () => {
    let list = [];
    for (let k in data) {
      {
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
                        {/* {data[k].locked ? <FaLock /> : ""} */}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </details>
          </li>
        );
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
                    {/* {loadIndex()} */}
                  </ul>
                </div>
              </aside>
              <main
                role="main"
                className=" md:pl-9  w-full sm:w-2/3 md:w-3/4 pt-1 px-2"
              >
                <ReactMarkdown
                  className="prose  max-w-none"
                  remarkPlugins={[remarkGfm, remarkToc]}
                  rehypePlugins={[rehypeHighlight, rehypeRaw, rehypeSanitize]}
                >
                  {markdown}
                </ReactMarkdown>
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
