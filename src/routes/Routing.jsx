import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//local imports
import { items } from "../configs/route";
import Element from "./Element";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        {items?.map((item) => (
          <Route key={item.path} path={item.path} element={<Element item={item} />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
