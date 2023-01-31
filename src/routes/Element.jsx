import React, { useCallback } from "react";
import { useLocation, useNavigate } from "react-router";
import { useJwt } from "react-jwt";
import axios from "axios";

const Element = ({ item }) => {
  const { element } = item;

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");

  const Render = useCallback(() => {
    !token && pathname === "/login" && navigate("/auth/register");

    return <>{element}</>;
  }, [element, navigate, pathname, token]);

  return <Render />;
}; 

export default Element;
