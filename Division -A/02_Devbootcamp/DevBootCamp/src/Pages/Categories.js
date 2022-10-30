import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { CardCourse } from "../Components/CardCourse";
import DropDown from "../Components/DropDown";
export const Categories = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    price: "any",
    rating: "any",
    level: "any",
    category: "any",
    tags: [],
  });

  const [allcourses, setAllcourses] = useState(null);

  async function getAllcourses() {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_API}allcourses`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "x-access-tokens": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );
    let data = await response.json();
    if (response.status === 200) {
      setAllcourses(data.list_of_books);
    } else {
      return console.log(data);
    }
  }

  useEffect(() => {
    if (!allcourses) getAllcourses();
  }, []);

  const handleChange = (e) => {
    if (e.from == "price") {
      setFilters((prevState) => ({
        ...prevState,
        price: e.action.target.value,
      }));
    } else if (e.from == "rating") {
      setFilters((prevState) => ({
        ...prevState,
        rating: e.action.target.value,
      }));
    } else if (e.from == "level") {
      setFilters((prevState) => ({
        ...prevState,
        level: e.action.target.value,
      }));
    } else if (e.from == "category") {
      setFilters((prevState) => ({
        ...prevState,
        category: e.action,
      }));
    }
  };

  const tongleFilter = () => setShowFilter(!showFilter);
  return (
    <>
      <Navbar />
      <div className="2xl:container 2xl:mx-auto">
        {/* <!--- more free and premium Tailwind CSS components at https://tailwinduikit.com/ ---> */}

        <div className="md:py-12 lg:px-20 md:px-6 py-9 px-4">
          <nav aria-label="Breadcrumb">
            <ol
              role="list"
              className="flex items-center gap-1 text-sm text-gray-500"
            >
              <li>
                <a
                  href="#"
                  className="block transition-colors hover:text-gray-700"
                >
                  <span className="sr-only"> Home </span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </a>
              </li>

              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </li>

              <li>
                <a
                  href="#"
                  className="block transition-colors hover:text-gray-700"
                >
                  Categories
                </a>
              </li>

              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </li>

              <li>
                <a
                  href="#"
                  className="block transition-colors hover:text-gray-700"
                >
                  {filters.category}
                </a>
              </li>
            </ol>
          </nav>

          <div className="flex justify-between items-center">
            <h2 className="lg:text-4xl dark:text-white text-3xl lg:leading-9 leading-7 text-gray-800 font-semibold">
              Watches
            </h2>

            {/* <!-- filters Button (md and plus Screen) --> */}
            <button
              onClick={tongleFilter}
              className="cursor-pointer text-white sm:flex hidden hover:bg-gray-700 focus:ring focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-4 px-6 bg-gray-800 flex text-base leading-4 font-normal text-white justify-center items-center"
            >
              <svg
                className="mr-2"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12C7.10457 12 8 11.1046 8 10C8 8.89543 7.10457 8 6 8C4.89543 8 4 8.89543 4 10C4 11.1046 4.89543 12 6 12Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 4V8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 12V20"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 18C13.1046 18 14 17.1046 14 16C14 14.8954 13.1046 14 12 14C10.8954 14 10 14.8954 10 16C10 17.1046 10.8954 18 12 18Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 4V14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 18V20"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18 9C19.1046 9 20 8.10457 20 7C20 5.89543 19.1046 5 18 5C16.8954 5 16 5.89543 16 7C16 8.10457 16.8954 9 18 9Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18 4V5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18 9V20"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Filters
            </button>
          </div>

          {/* <!-- Filters Button (Small Screen) --> */}

          <button
            onClick={tongleFilter}
            className="cursor-pointer mt-6 block sm:hidden hover:bg-gray-700 focus:ring focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-2 w-full bg-gray-800 flex text-base leading-4 font-normal text-white dark:text-gray-800 dark:bg-white dark:hover:bg-gray-100 justify-center items-center"
          >
            <svg
              className="mr-2"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 12C7.10457 12 8 11.1046 8 10C8 8.89543 7.10457 8 6 8C4.89543 8 4 8.89543 4 10C4 11.1046 4.89543 12 6 12Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 4V8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 12V20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 18C13.1046 18 14 17.1046 14 16C14 14.8954 13.1046 14 12 14C10.8954 14 10 14.8954 10 16C10 17.1046 10.8954 18 12 18Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 4V14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 18V20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18 9C19.1046 9 20 8.10457 20 7C20 5.89543 19.1046 5 18 5C16.8954 5 16 5.89543 16 7C16 8.10457 16.8954 9 18 9Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18 4V5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18 9V20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Filters
          </button>
        </div>

        {showFilter ? (
          <div
            id="filterSection"
            className="block relative md:py-10 lg:px-20 md:px-6 py-9 px-4 bg-gray-50 dark:bg-gray-800 w-full"
          >
            {/* <!-- Cross button Code --> */}
            <div
              onClick={tongleFilter}
              className="cursor-pointer text-gray-800 dark:text-white absolute right-0 top-0 md:py-10 lg:px-20 md:px-6 py-9 px-4"
            >
              <svg
                className="lg:w-6 lg:h-6 w-4 h-4"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M25 1L1 25"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 1L25 25"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* <!-- Categories Section --> */}
            <div>
              <div className="flex space-x-2 text-gray-800 dark:text-white ">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.8">
                    <path
                      d="M9 4H5C4.44772 4 4 4.44772 4 5V9C4 9.55228 4.44772 10 5 10H9C9.55228 10 10 9.55228 10 9V5C10 4.44772 9.55228 4 9 4Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 14H5C4.44772 14 4 14.4477 4 15V19C4 19.5523 4.44772 20 5 20H9C9.55228 20 10 19.5523 10 19V15C10 14.4477 9.55228 14 9 14Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M19 14H15C14.4477 14 14 14.4477 14 15V19C14 19.5523 14.4477 20 15 20H19C19.5523 20 20 19.5523 20 19V15C20 14.4477 19.5523 14 19 14Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 7H20"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17 4V10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
                <p className="lg:text-2xl text-xl lg:leading-6 leading-5 font-medium ">
                  Categories
                </p>
              </div>
              <div className="mt-8 px-10 h-10">
                {/* // dropdown */}
                <DropDown
                  data={["any", "dsa", "coa", "cnnd"]}
                  setData={(e) => handleChange({ from: "category", action: e })}
                />
              </div>

              <hr className="bg-gray-200 lg:w-6/12 w-full md:my-10 my-8" />

              {/* <!-- Price --> */}
              <div>
                <div className="flex space-x-2 text-gray-800 dark:text-white">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 3H15C14.4696 3 13.9609 3.21071 13.5858 3.58579C13.2107 3.96086 13 4.46957 13 5V17C13 18.0609 13.4214 19.0783 14.1716 19.8284C14.9217 20.5786 15.9391 21 17 21C18.0609 21 19.0783 20.5786 19.8284 19.8284C20.5786 19.0783 21 18.0609 21 17V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.9994 7.35022L10.9994 5.35022C10.6243 4.97528 10.1157 4.76465 9.58539 4.76465C9.05506 4.76465 8.54644 4.97528 8.17139 5.35022L5.34339 8.17822C4.96844 8.55328 4.75781 9.06189 4.75781 9.59222C4.75781 10.1225 4.96844 10.6312 5.34339 11.0062L14.3434 20.0062"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.3 13H5C4.46957 13 3.96086 13.2107 3.58579 13.5858C3.21071 13.9609 3 14.4696 3 15V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H17"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17 17V17.01"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="lg:text-2xl text-xl lg:leading-6 leading-5 font-medium">
                    Price
                  </p>
                </div>
                <div className="md:flex md:space-x-6 mt-8 grid grid-cols-3 gap-y-8 flex-wrap">
                  <div className="flex space-x-2 md:justify-center md:items-center items-center justify-start">
                    <input
                      onChange={(e) =>
                        handleChange({ from: "price", action: e })
                      }
                      className="w-4 h-4 mr-2"
                      type="radio"
                      id="price"
                      name="price"
                      value="any"
                    />
                    <p className="text-base leading-4 dark:text-gray-300 text-gray-600 font-normal">
                      any
                    </p>
                  </div>
                  <div className="flex space-x-2 md:justify-center md:items-center items-center justify-start">
                    <input
                      onChange={(e) =>
                        handleChange({ from: "price", action: e })
                      }
                      className="w-4 h-4 mr-2"
                      type="radio"
                      id="price"
                      name="price"
                      value="100"
                    />
                    <p className="text-base leading-4 dark:text-gray-300 text-gray-600 font-normal">
                      above 100$
                    </p>
                  </div>
                  <div className="flex space-x-2 justify-center items-center">
                    <input
                      onChange={(e) =>
                        handleChange({ from: "price", action: e })
                      }
                      className="w-4 h-4 mr-2"
                      type="radio"
                      id="price"
                      name="price"
                      value="500"
                    />
                    <p className="text-base leading-4 dark:text-gray-300 text-gray-600 font-normal">
                      above 500$
                    </p>
                  </div>
                  <div className="flex space-x-2 md:justify-center md:items-center items-center justify-end">
                    <input
                      onChange={(e) =>
                        handleChange({ from: "price", action: e })
                      }
                      className="w-4 h-4 mr-2"
                      type="radio"
                      id="price"
                      name="price"
                      value="1000"
                    />
                    <p className="text-base leading-4 dark:text-gray-300 text-gray-600 font-normal">
                      above 1000$
                    </p>
                  </div>
                </div>
              </div>

              <hr className="bg-gray-200 lg:w-6/12 w-full md:my-10 my-8" />

              {/* <!-- Rating Section --> */}
              <div>
                <div className="flex space-x-2 text-gray-800 dark:text-white">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.5 16C13.0899 16 16 13.0899 16 9.5C16 5.91015 13.0899 3 9.5 3C5.91015 3 3 5.91015 3 9.5C3 13.0899 5.91015 16 9.5 16Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M19 10H12C10.8954 10 10 10.8954 10 12V19C10 20.1046 10.8954 21 12 21H19C20.1046 21 21 20.1046 21 19V12C21 10.8954 20.1046 10 19 10Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="lg:text-2xl text-xl lg:leading-6 leading-5 font-medium ">
                    Rating
                  </p>
                </div>
                <div className="md:flex md:space-x-6 mt-8 grid grid-cols-3 gap-y-8 flex-wrap">
                  <div className="flex space-x-2 md:justify-center md:items-center items-center justify-start">
                    <input
                      onChange={(e) =>
                        handleChange({ from: "rating", action: e })
                      }
                      className="w-4 h-4 mr-2"
                      type="radio"
                      id="rating"
                      name="rating"
                      value="any"
                    />
                    <div className="inline-block">
                      <div className="flex space-x-6 justify-center items-center">
                        <label
                          className="mr-2 text-sm leading-3 dark:text-gray-300 font-normal text-gray-600"
                          htmlFor="Leather"
                        >
                          any
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2 md:justify-center md:items-center items-center justify-start">
                    <input
                      onChange={(e) =>
                        handleChange({ from: "rating", action: e })
                      }
                      className="w-4 h-4 mr-2"
                      type="radio"
                      id="rating"
                      name="rating"
                      value="1"
                    />
                    <div className="inline-block">
                      <div className="flex space-x-6 justify-center items-center">
                        <label
                          className="mr-2 text-sm leading-3 dark:text-gray-300 font-normal text-gray-600"
                          htmlFor="Leather"
                        >
                          1
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2 md:justify-center md:items-center items-center justify-start">
                    <input
                      onChange={(e) =>
                        handleChange({ from: "rating", action: e })
                      }
                      className="w-4 h-4 mr-2"
                      type="radio"
                      id="rating"
                      name="rating"
                      value="2"
                    />
                    <div className="inline-block">
                      <div className="flex space-x-6 justify-center items-center">
                        <label
                          className="mr-2 text-sm leading-3 dark:text-gray-300 font-normal text-gray-600"
                          htmlFor="Leather"
                        >
                          2
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2 md:justify-center md:items-center items-center justify-start">
                    <input
                      onChange={(e) =>
                        handleChange({ from: "rating", action: e })
                      }
                      className="w-4 h-4 mr-2"
                      type="radio"
                      id="rating"
                      name="rating"
                      value="3"
                    />
                    <div className="inline-block">
                      <div className="flex space-x-6 justify-center items-center">
                        <label
                          className="mr-2 text-sm leading-3 dark:text-gray-300 font-normal text-gray-600"
                          htmlFor="Leather"
                        >
                          3
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2 md:justify-center md:items-center items-center justify-start">
                    <input
                      onChange={(e) =>
                        handleChange({ from: "rating", action: e })
                      }
                      className="w-4 h-4 mr-2"
                      type="radio"
                      id="rating"
                      name="rating"
                      value="4"
                    />
                    <div className="inline-block">
                      <div className="flex space-x-6 justify-center items-center">
                        <label
                          className="mr-2 text-sm leading-3 dark:text-gray-300 font-normal text-gray-600"
                          htmlFor="Leather"
                        >
                          4
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2 md:justify-center md:items-center items-center justify-start">
                    <input
                      onChange={(e) =>
                        handleChange({ from: "rating", action: e })
                      }
                      className="w-4 h-4 mr-2"
                      type="radio"
                      id="rating"
                      name="rating"
                      value="5"
                    />
                    <div className="inline-block">
                      <div className="flex space-x-6 justify-center items-center">
                        <label
                          className="mr-2 text-sm leading-3 dark:text-gray-300 font-normal text-gray-600"
                          htmlFor="Leather"
                        >
                          5
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="bg-gray-200 lg:w-6/12 w-full md:my-10 my-8" />

              {/* <!-- Level Section --> */}
              <div>
                <div className="flex space-x-2 text-gray-800 dark:text-white">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 5H14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 7L14 5L12 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5 3L3 5L5 7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M19 10V21"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17 19L19 21L21 19"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21 12L19 10L17 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 10H5C3.89543 10 3 10.8954 3 12V19C3 20.1046 3.89543 21 5 21H12C13.1046 21 14 20.1046 14 19V12C14 10.8954 13.1046 10 12 10Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="lg:text-2xl text-xl lg:leading-6 leading-5 font-medium ">
                    Level
                  </p>
                </div>
                <div className="md:flex md:space-x-6 mt-8 grid grid-cols-3 gap-y-8 flex-wrap">
                  <div className="flex md:justify-center md:items-center items-center justify-start">
                    <input
                      onChange={(e) =>
                        handleChange({ from: "level", action: e })
                      }
                      className="w-4 h-4 mr-2"
                      type="radio"
                      id="level"
                      name="level"
                      value="any"
                    />
                    <div className="inline-block">
                      <div className="flex space-x-6 justify-center items-center">
                        <label
                          className="mr-2 text-sm leading-3 font-normal text-gray-600 dark:text-gray-300"
                          htmlFor="Large"
                        >
                          Any
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex md:justify-center md:items-center items-center justify-start">
                    <input
                      onChange={(e) =>
                        handleChange({ from: "level", action: e })
                      }
                      className="w-4 h-4 mr-2"
                      type="radio"
                      id="level"
                      name="level"
                      value="beginner"
                    />
                    <div className="inline-block">
                      <div className="flex space-x-6 justify-center items-center">
                        <label
                          className="mr-2 text-sm leading-3 font-normal text-gray-600 dark:text-gray-300"
                          htmlFor="Large"
                        >
                          Beginner
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex md:justify-center md:items-center items-center justify-start">
                    <input
                      onChange={(e) =>
                        handleChange({ from: "level", action: e })
                      }
                      className="w-4 h-4 mr-2"
                      type="radio"
                      id="level"
                      name="level"
                      value="Intermidiate"
                    />
                    <div className="inline-block">
                      <div className="flex space-x-6 justify-center items-center">
                        <label
                          className="mr-2 text-sm leading-3 font-normal text-gray-600 dark:text-gray-300"
                          htmlFor="Large"
                        >
                          Intermidiate
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex md:justify-center md:items-center items-center justify-start">
                    <input
                      onChange={(e) =>
                        handleChange({ from: "level", action: e })
                      }
                      className="w-4 h-4 mr-2"
                      type="radio"
                      id="level"
                      name="level"
                      value="Advance"
                    />
                    <div className="inline-block">
                      <div className="flex space-x-6 justify-center items-center">
                        <label
                          className="mr-2 text-sm leading-3 font-normal text-gray-600 dark:text-gray-300"
                          htmlFor="Large"
                        >
                          Advance
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="bg-gray-200 lg:w-6/12 w-full md:my-10 my-8" />

              {/* <!-- Tags Section --> */}
              <div>
                <div className="flex space-x-2 text-gray-800 dark:text-white ">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.8">
                      <path
                        d="M9 4H5C4.44772 4 4 4.44772 4 5V9C4 9.55228 4.44772 10 5 10H9C9.55228 10 10 9.55228 10 9V5C10 4.44772 9.55228 4 9 4Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 14H5C4.44772 14 4 14.4477 4 15V19C4 19.5523 4.44772 20 5 20H9C9.55228 20 10 19.5523 10 19V15C10 14.4477 9.55228 14 9 14Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M19 14H15C14.4477 14 14 14.4477 14 15V19C14 19.5523 14.4477 20 15 20H19C19.5523 20 20 19.5523 20 19V15C20 14.4477 19.5523 14 19 14Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14 7H20"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17 4V10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </svg>
                  <p className="lg:text-2xl text-xl lg:leading-6 leading-5 font-medium ">
                    Tags
                  </p>
                </div>
                <div className="flex mt-8 flex-nowrap overflow-x-auto space-x-8 h-10">
                  {["github", "react", "name"].map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-center items-center"
                    >
                      <input
                        className="w-4 h-4 mr-2"
                        type="checkbox"
                        id="LS"
                        name="LS"
                        value={item}
                      />
                      <div className="inline-block">
                        <div className="flex space-x-6 justify-center items-center">
                          <label
                            className="mr-2 text-sm leading-3 font-normal dark:text-gray-300 text-gray-600"
                            htmlFor="LS"
                          >
                            {item}
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* <!-- Apply Filter Button (Large Screen) --> */}

            {/* <div className="hidden md:block absolute right-0 bottom-0 md:py-10 lg:px-20 md:px-6 py-9 px-4">
              <button className="hover:bg-gray-700 dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:ring focus:ring-offset-2 focus:ring-gray-800 text-base leading-4 font-medium py-4 px-10 text-white bg-gray-800">
                Apply Filter
              </button>
            </div> */}

            {/* <!-- Apply Filter Button (Table or lower Screen) --> */}

            {/* <div className="block md:hidden w-full mt-10">
              <button className="w-full hover:bg-gray-700 dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:ring focus:ring-offset-2 focus:ring-gray-800 text-base leading-4 font-medium py-4 px-10 text-white bg-gray-800">
                Apply Filter
              </button>
            </div> */}
          </div>
        ) : (
          ""
        )}

        <div className="md:py-8 lg:px-20 md:px-6 flex flex-nowrap overflow-x-auto space-x-8 ">
          <strong className="rounded border border-current px-3 py-1.5 text-[12px] font-medium lowercase text-blue-500">
            {"#price:" + filters.price}
          </strong>

          <strong className="rounded border border-current px-3 py-1.5 text-[12px] font-medium lowercase text-blue-500">
            {"#level: " + filters.level}
          </strong>

          <strong className="rounded border border-current px-3 py-1.5 text-[12px] font-medium lowercase text-blue-500">
            {"#rating: " + filters.rating}
          </strong>

          <strong className="rounded border border-current px-3 py-1.5 text-[12px] font-medium lowercase text-blue-500">
            {"#category: " + filters.category}
          </strong>
        </div>
        <div className="grid m-5 grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-y-10 gap-x-5 items-start">
          {allcourses
            ? allcourses.map((x, i) =>
                (filters.category == "any" || x.category == filters.category) &&
                x.price >=
                  (filters.price == "any" ? true : parseInt(filters.price)) &&
                (filters.rating == "any" ||
                  x.rate == parseInt(filters.rating)) ? (
                  <CardCourse
                    price={x.price}
                    rating={x.rate}
                    category={x.category}
                    key={i}
                    title={x.title}
                    description={x.dis}
                    link={x.link}
                    image={x.image}
                  />
                ) : (
                  ""
                )
              )
            : ""}
        </div>
      </div>
      <Footer />
    </>
  );
};
