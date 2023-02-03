import React, { useState } from "react";
import { useFormik, FormikProvider } from "formik";
import { showNotification } from "@mantine/notifications";
import { AiOutlineMail, AiOutlineUser, AiOutlineSend, AiOutlineCheck } from "react-icons/ai";
import { BiErrorCircle } from "react-icons/bi";
import axios from "axios";
import { format } from "date-fns";
import { useNavigate } from "react-router";

//local imports
import Layout from "layouts/Layout";
import CustomInput from "components/inputs/CustomInput";
import { RegisterSchema } from "utils/validation-schema";
import CustomButton from "components/buttons/CustomButton";
import CustomCheckbox from "components/inputs/CustomCheckbox";
import { CustomPasswordInput } from "components/inputs/CustomPasswordInput";
import { Link } from "react-router-dom";

const Register = () => {
  const [disabledButton, setDisabledButton] = useState();
  const url = "https://cerulean-fossa-cap.cyclic.app/register";

  const navigate = useNavigate();

  const created_dates = format(new Date(2014, 1, 11), "MM/dd/yyyy");

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      userName: "",
      password: "",
      confirm: "",
      created_date: created_dates,
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      console.log(values);
      setDisabledButton(true);
      axios
        .post(url, values)
        .then((response) => {
          console.log(response);
          showNotification({
            color: "green",
            disallowClose: true,
            autoClose: 5000,
            title: "Başarılı",
            message: response?.data?.message,
            icon: <AiOutlineCheck />,
          });
          navigate("/auth/login", { state: { email: values.email, password: values.password } });
          setDisabledButton(false);
        })
        .catch(function (error) {
          setDisabledButton(false);

          showNotification({
            color: "red",
            disallowClose: true,
            autoClose: 5000,
            title: "Hata",
            message: error?.response?.data?.message,
            icon: <BiErrorCircle />,
          });

          console.log(error?.message);
        });
    },
  });

  const { email, name, userName, password, confirm } = formik.values;
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="p-4 drop-shadow-2xl bg-white rounded-md">
        <h1 className="mb-8 text-center">Register</h1>
        <Link to="/auth/login">
          Do you have an account <strong>Login</strong>{" "}
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
            <CustomInput
              label="Ad Soyad"
              name="name"
              type="text"
              placeholder="Ad Soyad giriniz"
              value={name}
              onChange={formik.handleChange}
              error={formik.touched.name && formik.errors.name}
              icon={<AiOutlineUser size={24} />}
            />
            <CustomInput
              label="Kullanıcı Adı"
              name="userName"
              type="text"
              placeholder="Kullanıcı Adı giriniz"
              value={userName}
              onChange={formik.handleChange}
              error={formik.touched.userName && formik.errors.userName}
              icon={<AiOutlineUser size={24} />}
            />

            <CustomPasswordInput name="password" value={password} onChange={formik.handleChange} error={formik.touched.password && formik.errors.password} />
            <CustomCheckbox
              name="confirm"
              onChange={formik.handleChange}
              error={formik.touched.confirm && formik.errors.confirm}
              value={confirm}
              mt="md"
              label="I agree to sell my privacy."
            />
            <div className="flex justify-end ">
              {" "}
              <CustomButton variant="light" type="submit" children="Kayıt Ol" disabled={disabledButton} icon={<AiOutlineSend />} />
            </div>
          </form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default Register;
