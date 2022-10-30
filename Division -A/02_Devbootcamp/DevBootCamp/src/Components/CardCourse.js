import React from "react";
import { Link } from "react-router-dom";

export const CardCourse = (props) => {
  return (
    <Link
      to={`/DevBootCamp/course/${props.link}`}
      className="block transform transition duration-500 hover:scale-105 border-solid hover:border-2 hover:border-purple-600 overflow-hidden rounded-2xl"
    >
      <img
        className="object-cover w-full h-56"
        src={`${process.env.REACT_APP_STATIC_API}static/images/${props.image}`}
        alt=""
      />

      <div className="p-4 bg-gray-900">
        <p className="text-xs text-gray-500">
          {`${props.category} `} {`( ${props.price} $ )`}
        </p>

        <h5 className="text-sm text-white">
          {props.title} {`( ${props.rating} stars )`}
        </h5>

        <p className="mt-1 text-xs text-gray-500">{props.description}</p>
        <button
          className="block w-full p-4 mt-4 text-sm font-medium rounded-sm border-2 border-purple-600 rounded-lg px-3 py-2 text-purple-400 cursor-pointer hover:bg-purple-600 hover:text-purple-200"
          type="button"
        >
          {props.link ? "Enrolled" : "Enroll"}
        </button>
      </div>
    </Link>
  );
};
