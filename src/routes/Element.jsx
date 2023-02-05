import React, { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const Element = ({ item }) => {
  const { element } = item;

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");

  useEffect(() => {
    !token && pathname !== "/auth/login" && navigate("/auth/register");
  }, [navigate, pathname, token]);

  const Render = useCallback(() => {
    return <>{element}</>;
  }, [element]);

  return <Render />;
};

export default Element;
