import React, { useEffect, useState } from "react";
import { useFormik, FormikProvider } from "formik";
import { showNotification } from "@mantine/notifications";
import { AiOutlineMail, AiOutlineSend, AiOutlineCheck } from "react-icons/ai";
import { BiErrorCircle } from "react-icons/bi";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";

//local imports
import Layout from "layouts/Layout";
import CustomInput from "components/inputs/CustomInput";
import { LoginSchema } from "utils/validation-schema";
import CustomButton from "components/buttons/CustomButton";
import { CustomPasswordInput } from "components/inputs/CustomPasswordInput";
import { Link } from "react-router-dom";

const Login = () => {
  const [disabledButton, setDisabledButton] = useState();

  const url = "https://cerulean-fossa-cap.cyclic.app/login";
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      setDisabledButton(true)
      console.log(values);

      axios
        .post(url, values)
        .then((response) => {
          console.log(response);
          localStorage.setItem("token", response?.data?.token);
          localStorage.setItem("refreshToken", response?.data?.refreshtoken);
          console.log(response.data.message);
          console.log(response?.data?.user);
          console.log([response?.data?.user]);
          showNotification({
            color: "green",
            disallowClose: true,
            autoClose: 5000,
            title: "Başarılı",
            message: response?.data?.message,
            icon: <AiOutlineCheck />,
          });
            setDisabledButton(false)
            const user = { name: "asd", age: 30 };
            console.log(user)
            localStorage.setItem("user",JSON.stringify(response?.data?.user))

         setTimeout(() => {
          navigate("/");
         }, 1500);
        })
        .catch((error) => {
          console.log(error);
          showNotification({
            color: "red",
            disallowClose: true,
            autoClose: 5000,
            title: "Hata",
            message: error?.message,
            icon: <BiErrorCircle />,
          });
            setDisabledButton(false)
        });
    },
  });

  useEffect(() => {
    state && formik.setFieldValue("email", state.email);
    state && formik.setFieldValue("password", state.password);
  }, [state]);

  const { email, password } = formik.values;
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="p-4 drop-shadow-2xl bg-white rounded-md">
        <h1 className="mb-8 text-center">Login</h1>
        <Link to="/auth/register">
          Don't you have an account <strong>Register</strong>{" "}
        </Link>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <CustomInput
              label="Email"
              name="email"
              type="text"
              placeholder="Email giriniz"
              value={email}
              onChange={formik.handleChange}
              error={formik.touched.email && formik.errors.email}
              icon={<AiOutlineMail size={24} />}
            />
            <CustomPasswordInput name="password" value={password} onChange={formik.handleChange} error={formik.touched.password && formik.errors.password} />
            <div className="flex justify-end mt-4">
              {" "}
              <CustomButton  variant="light" type="submit" children="Giriş Yap" disabled={disabledButton} icon={<AiOutlineSend />} />
            </div>{" "}
          </form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default Login;
