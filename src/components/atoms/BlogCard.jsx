import { Rating } from "@mantine/core";
import React from "react";
import { format } from "date-fns";

const BlogCard = ({ category, createdAt, description, stars, body, title, readTime, image }) => {
    
  return (
    <div className="w-full  bg-white border border-gray-200 rounded-lg shadow ">
      <img className="p-8 rounded-t-lg" src="https://flowbite.com/docs/images/products/apple-watch.png" alt="product imsage" />
      <div className="px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 ">{title}</h5>
        <p className="text-xl font-semibold tracking-tight text-gray-900 ">{description}</p>
        <div className="flex justify-between items-center mt-2.5 mb-5">
          <Rating readOnly value={stars} size="sm" />

          <span className="bg-blue-50 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded  ml-3">readTime: {readTime}</span>
          {/*  <span className="bg-red-50 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded  ml-3">readTime:{ {format(createdAt, "MM/dd/yyyy")}}</span> */}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900 ">$599</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
