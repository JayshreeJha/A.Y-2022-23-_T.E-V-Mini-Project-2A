import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { CardTestimonial } from "./CardTestimonial";
import { Navigation, Pagination, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { DataTestimonial } from "./DataTestimonial";
export function Testimonials() {
  return (
    <section className="bg-gray-100">
      <div className="px-4 py-16 mx-auto sm:px-6 lg:pl-8 lg:pr-0 lg:mr-0 sm:py-24 max-w-[1340px]">
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-16 gap-y-8 lg:items-center">
          <div className="max-w-xl text-center sm:text-left">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Dont just take our word for it...
              <br className="hidden sm:block lg:hidden" />
              Read reviews from our customers
            </h2>

            <p className="mt-4 text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas
              veritatis illo placeat harum porro optio fugit a culpa sunt id!
            </p>
          </div>

          <div className="-mx-6 lg:col-span-2 lg:mx-0">
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              modules={[Navigation, Pagination, A11y]}
              navigation={true}
              pagination={{ clickable: true }}
              onSlideChange={() => console.log("slide change")}
            >
              <div className=" overflow-hidden">
                {DataTestimonial.map((item, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <CardTestimonial
                        rate={item.rate}
                        title={item.title}
                        dis={item.dis}
                        author={item.author}
                      />
                    </SwiperSlide>
                  );
                })}
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
