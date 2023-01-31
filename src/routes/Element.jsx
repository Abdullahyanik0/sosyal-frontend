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

  const { isExpired: tokenExprired } = useJwt(token);
  const { isExpired: refreshTokenExprired } = useJwt(refreshToken);

  console.log("tokenExprired", tokenExprired);
  console.log("refreshTokenExprired", refreshTokenExprired);

  const tokenControl = tokenExprired && !refreshTokenExprired;
  console.log("tokenControl", tokenControl);

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401 && error.response.data.message === "Token expired") {
        console.log("calıştı");
        const url = "https://cerulean-fossa-cap.cyclic.app/refreshtoken";
        axios
          .post(url, { refreshToken: refreshToken })
          .then((response) => {
            console.log(response);

            localStorage.setItem("token", response?.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        return Promise.reject(error);
      }
    }
  );

  const Render = useCallback(() => {
    !token && refreshToken && pathname === "/login" && navigate("/auth/register");

    return <>{element}</>;
  }, [element, navigate, pathname, refreshToken, token]);

  return <Render />;
};

export default Element;
