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
  const [loading, setloading] = useState();
  const url = "https://social-blogs.cyclic.app/register";

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
      setloading(true);
      axios
        .post(url, values)
        .then((response) => {
          showNotification({ color: "green", disallowClose: true, autoClose: 3000, title: "Başarılı", message: response?.data?.message, icon: <AiOutlineCheck /> });
          navigate("/auth/login", { state: { email: values.email, password: values.password } });
        })
        .catch(function (error) {
          setloading(false);

          showNotification({ color: "red", disallowClose: true, autoClose: 3000, title: "Hata", message: error?.response?.data?.message, icon: <BiErrorCircle /> });

          console.log(error?.message);
        });
    },
  });

  const { email, name, userName, password, confirm } = formik.values;
  const { dirty } = formik;
  return (
    <div className="flex flex-col justify-center items-center h-screen ">
      <div className="p-4 drop-shadow-2xl bg-white rounded-xl w-[95%] sm:w-[450px]">
        <h1 className="mb-8 text-center">Register</h1>
        <Link to="/auth/login">
          Do you have an account <strong>Login</strong>{" "}
        </Link>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <CustomInput
              id="Email"
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
              id="name"
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
              id="userName"
              label="Kullanıcı Adı"
              name="userName"
              type="text"
              placeholder="Kullanıcı Adı giriniz"
              value={userName}
              onChange={formik.handleChange}
              error={formik.touched.userName && formik.errors.userName}
              icon={<AiOutlineUser size={24} />}
            />

            <CustomPasswordInput id="password" name="password" value={password} onChange={formik.handleChange} error={formik.touched.password && formik.errors.password} />
            <CustomCheckbox
              id="confirm"
              name="confirm"
              onChange={formik.handleChange}
              error={formik.touched.confirm && formik.errors.confirm}
              value={confirm}
              mt="md"
              label="I agree to sell my privacy."
            />

            <CustomButton className="mt-4" fullWidth={true} variant="light" children="Kayıt Ol" type="submit" disabled={!dirty} loading={loading} icon={<AiOutlineSend />} />
          </form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default Register;
