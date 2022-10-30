import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "flex items-center px-4 py-2 text-gray-700 bg-gray-100 roundedLg",
  },
  {
    title: "Reports",
    path: "/reports",
    icon: <IoIcons.IoIosPaper />,
    cName: "flex items-center px-4 py-2 text-gray-700 bg-gray-100 roundedLg",
  },
  {
    title: "Products",
    path: "/products",
    icon: <FaIcons.FaCartPlus />,
    cName: "flex items-center px-4 py-2 text-gray-700 bg-gray-100 roundedLg",
    type: [
      {
        title: "Home",
        path: "/",
        icon: <AiIcons.AiFillHome />,
        cName:
          "flex items-center px-4 py-2 text-gray-700 bg-gray-100 roundedLg",
      },
      {
        title: "Reports",
        path: "/reports",
        icon: <IoIcons.IoIosPaper />,
        cName:
          "flex items-center px-4 py-2 text-gray-700 bg-gray-100 roundedLg",
      },
    ],
  },
  {
    title: "Team",
    path: "/team",
    icon: <IoIcons.IoMdPeople />,
    cName: "flex items-center px-4 py-2 text-gray-700 bg-gray-100 roundedLg",
  },
  {
    title: "Messages",
    path: "/messages",
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: "flex items-center px-4 py-2 text-gray-700 bg-gray-100 roundedLg",
  },
  {
    title: "Support",
    path: "/support",
    icon: <IoIcons.IoMdHelpCircle />,
    cName: "flex items-center px-4 py-2 text-gray-700 bg-gray-100 roundedLg",
  },
];

export const SidebarData2 = [
  {
    title: "Products",
    icon: <FaIcons.FaCartPlus />,
    cName: "flex items-center px-4 py-2 text-gray-700 bg-gray-100 roundedLg",
    icon2: <AiIcons.AiOutlineDown />,
    type: [
      {
        title: "Home",
        path: "/",
        icon: <AiIcons.AiFillHome />,
        cName:
          "flex items-center px-4 py-2 text-gray-500 roundedLg hover:bg-gray-100 hover:text-gray-700",
      },
      {
        title: "Reports",
        path: "/reports",
        icon: <IoIcons.IoIosPaper />,
        cName:
          "flex items-center px-4 py-2 text-gray-500 roundedLg hover:bg-gray-100 hover:text-gray-700",
      },
    ],
  },
];
