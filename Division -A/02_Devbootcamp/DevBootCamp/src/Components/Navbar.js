import React, { useState } from "react";
// import "./index.css";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { userSelector } from "../features/Users/UserSlice";
import { combineContent } from "../Content/combineContent";
import Sidebar from "./Sidebar";
import { navbarContent } from "../Content/navbarContent";
const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const {
    username,
    // email
  } = useSelector(userSelector);

  const logout = () => {
    localStorage.removeItem("token");

    window.location.reload();
  };
  return (
    <>
      <header className="bg-white sticky top-0 z-50 ">
        <div className="flex items-center h-16 max-w-screen-xl gap-8 px-4 mx-auto sm:px-6 lg:px-8">
          <a className="block text-teal-600" onClick={showSidebar}>
            <span className="sr-only">Homes</span>
            <p>{combineContent.title}</p>
          </a>

          <div className="flex items-center justify-end flex-1 md:justify-between">
            <nav
              className="hidden md:block"
              aria-labelledby="header-navigation"
            >
              <h2 className="sr-only" id="header-navigation">
                Header navigation
              </h2>

              <ul className="flex items-center gap-6 text-sm">
                {username
                  ? navbarContent.map((item, index) => (
                      <li key={index}>
                        <NavLink
                          className="text-gray-500 transition hover:text-gray-500/75"
                          to={item.to}
                        >
                          <span
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <span className="pr-1">{item.icon}</span>
                            {item.title}
                          </span>
                        </NavLink>
                      </li>
                    ))
                  : navbarContent.map((item, index) =>
                      item.protected ? (
                        ""
                      ) : (
                        <li key={index}>
                          <NavLink
                            className="text-gray-500 transition hover:text-gray-500/75"
                            to={item.to}
                          >
                            <span
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <span className="pr-1">{item.icon}</span>
                              {item.title}
                            </span>
                          </NavLink>
                        </li>
                      )
                    )}
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              {username ? `Hello, ${username}` : ""}

              {username !== "" ? (
                <div className="sm:gap-4 sm:flex">
                  <Link
                    className="block px-5 py-2.5 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 transition rounded-md"
                    to="#"
                    onClick={logout}
                  >
                    Logout
                  </Link>
                </div>
              ) : (
                <div className="sm:gap-4 sm:flex">
                  <Link
                    className="block px-5 py-2.5 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 transition rounded-md"
                    to="login"
                  >
                    Login
                  </Link>

                  <Link
                    className="hidden sm:block px-5 py-2.5 text-sm font-medium text-teal-600 bg-gray-100 rounded-md hover:text-teal-600/75 transition"
                    to="signup"
                  >
                    Register
                  </Link>
                </div>
              )}

              <button
                className="block p-2.5 text-gray-600 transition bg-gray-100 rounded md:hidden hover:text-gray-600/75"
                onClick={showSidebar}
              >
                <span className="sr-only">Toggle menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className={sidebar ? "" : "hidden"}>
        <Sidebar />
      </div>
    </>
  );
};
export default Navbar;
