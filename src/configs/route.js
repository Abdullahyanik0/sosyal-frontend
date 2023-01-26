import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Home from "../pages/Home";

export const items = [
  {
    path: "auth/login",
    element: <Login />,
  },
  {
    path: "auth/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Home />,
  },
];
