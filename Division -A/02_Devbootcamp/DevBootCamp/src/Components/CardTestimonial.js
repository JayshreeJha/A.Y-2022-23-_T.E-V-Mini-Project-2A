import React from "react";

export const CardTestimonial = (props) => {
  return (
    <li className="swiper-slide">
      <blockquote className="flex flex-col justify-between h-full p-12 bg-white">
        <div>
          <div className="flex gap-0.5 text-green-500">
            {[...Array(props.rate)].map((x, i) => (
              <svg
                key={i}
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          <div className="mt-4">
            <p className="text-2xl font-bold text-pink-600 sm:text-3xl">
              {props.title}
            </p>

            <p className="mt-4 leading-relaxed text-gray-500">
              No, Rose, they are not breathing. And they have no arms or legs …
              Where are they? You know what? If we come across somebody with no
              arms or legs, do we bother resuscitating them? I mean, what
              quality of life do we have there?
              {props.dis}
            </p>
          </div>
        </div>

        <footer className="mt-8 text-sm text-gray-500">
          &mdash; {props.author}
        </footer>
      </blockquote>
    </li>
  );
};
