import React from "react";

export const CardPagination = () => {
  return (
    <>
      <ol className="flex justify-center space-x-1 text-xs font-medium">
        <li>
          <a
            href="/?page=1"
            className="inline-flex items-center justify-center w-8 h-8 border border-gray-100 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </li>

        <li>
          <a
            href="/?page=1"
            className="block w-8 h-8 leading-8 text-center border border-gray-100 rounded"
          >
            1
          </a>
        </li>

        <li className="block w-8 h-8 leading-8 text-center text-white bg-blue-600 border-blue-600 rounded">
          2
        </li>

        <li>
          <a
            href="/?page=3"
            className="block w-8 h-8 leading-8 text-center border border-gray-100 rounded"
          >
            3
          </a>
        </li>

        <li>
          <a
            href="/?page=4"
            className="block w-8 h-8 leading-8 text-center border border-gray-100 rounded"
          >
            4
          </a>
        </li>

        <li>
          <a
            href="/?page=3"
            className="inline-flex items-center justify-center w-8 h-8 border border-gray-100 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </li>
      </ol>
    </>
  );
};
