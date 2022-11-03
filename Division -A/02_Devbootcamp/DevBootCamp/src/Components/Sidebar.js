import React from "react";
import { Link } from "react-router-dom";

import { SidebarData, SidebarData2 } from "./SidebarData";
export default function Sidebar() {
  return (
    <div className="fixed z-10 flex-col justify-between h-screen bg-white  border-r">
      <div className="px-4 py-6">
        <span className="block w-32 h-10 bg-gray-200 roundedLg"></span>

        <nav className="flex flex-col mt-6 space-y-1">
          {SidebarData2.map((item, index) => {
            return (
              <details key={index} className="group">
                <summary className="flex items-center px-4 py-2 text-gray-500 roundedLg cursor-pointer hover:bg-gray-100 hover:text-gray-700">
                  {item.icon}
                  <span className="ml-3 text-sm font-medium">{item.title}</span>
                  <span className="ml-auto transition duration-300 shrink-0 group-open:Rotate-180">
                    {item.icon2}
                  </span>
                </summary>

                <nav className="mt-1.5 ml-8 flex flex-col">
                  {item.type.map((item2, index2) => {
                    return (
                      <Link
                        to={item2.path}
                        key={index2}
                        className={item2.cName}
                      >
                        {item2.icon}
                        <span className="ml-3 text-sm font-medium">
                          {item2.title}
                        </span>
                      </Link>
                    );
                  })}
                </nav>
              </details>
            );
          })}
          {SidebarData.map((item, index) => {
            return (
              <Link to={item.path} key={index} className={item.cName}>
                {item.icon}
                <span className="ml-3 text-sm font-medium">{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <a
          href=""
          className="flex items-center p-4 bgWhite hover:bg-gray-50 shrink-0"
        >
          <img
            className="object-cover w-10 h-10 rounded-full"
            src="https://www.hyperui.dev/photos/man-4.jpeg"
            alt="Simon Lewis"
          />

          <div className="ml-1.5">
            <p className="text-xs">
              <strong className="block font-medium">Simon Lewis</strong>

              <span> simonlewis@fakemail.com </span>
            </p>
          </div>
        </a>
      </div>
    </div>
  );
}
