import React, { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const Element = ({ item }) => {
  const { element } = item;

  const navigate = useNavigate();
  const { pathname } = useLocation();

  console.log(pathname);
  useEffect(() => {
    pathname === "/" && navigate("/auth/register");
  }, [navigate, pathname]);

  const Render = useCallback(() => {
    return <>{element}</>;
  }, [element]);

  return <Render />;
};

export default Element;
