// import { format } from "prettier";
import React, { useEffect, useState } from "react";
import { CardCourse } from "./CardCourse";

export const CardFLow = () => {
  const [more, setmore] = useState(false);
  const [allcourses, setAllcourses] = useState(null);

  async function getAllcourses() {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_API}allcourses`,
      {
        Accept: "application/json",
        "Content-Type": "application/json",
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

  const showmore = () => setmore(!more);
  return (
    <>
      {allcourses ? (
        <>
          <div className="max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="max-w-xl">
              <h2 className="text-3xl font-serif font-bold sm:text-4xl">
                Our Speacial Courses
              </h2>
            </div>
          </div>
          <div className="grid m-5 grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-y-10 gap-x-5 items-start">
            {allcourses.map((x, i) => (
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
            ))}
          </div>
          <div className="flex items-center justify-center">
            <button
              className="block w-1/2 lg:w-1/4 p-4 mt-4 text-sm font-medium rounded-sm border-2 border-purple-600 rounded-lg px-3 py-2 text-purple-400 cursor-pointer hover:bg-purple-600 hover:text-purple-200"
              type="button"
              onClick={showmore}
            >
              {more ? "Show Less" : "Show More"}
            </button>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};
