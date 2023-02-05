import Headers from "components/molecules/Headers";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col">
      <Headers />
      <div className="min-h-screen ">{children}</div>;
    </div>
  );
};

export default Layout;
