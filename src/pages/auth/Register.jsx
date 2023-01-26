import React from "react";
import { useFormik, FormikProvider } from "formik";
import { showNotification } from "@mantine/notifications";
import { AiOutlineMail, AiOutlineUser, AiOutlineSend, AiOutlineCheck } from "react-icons/ai";
import { BiErrorCircle } from "react-icons/bi";
import axios from "axios";

//local imports
import Layout from "layouts/Layout";
import CustomInput from "components/inputs/CustomInput";
import { RegisterSchema } from "utils/validation-schema";
import CustomButton from "components/buttons/CustomButton";
import CustomCheckbox from "components/inputs/CustomCheckbox";
import { CustomPasswordInput } from "components/inputs/CustomPasswordInput";
import { useNavigate } from "react-router";

const Register = () => {
  const url = "http://localhost:4000/register";
  
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      userName: "",
      password: "",
      confirm: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      axios
        .post(url, values)
        .then((response) => {
          console.log(response);
          response.status === 200 &&
            showNotification({
              color: "green",
              disallowClose: true,
              autoClose: 5000,
              title: "Başarılı",
              message: response?.data?.message,
              icon: <AiOutlineCheck />,
            });
          response.status === 200 && navigate("/auth/login");
          response.status === 201 &&
            showNotification({
              color: "red",
              disallowClose: true,
              autoClose: 5000,
              title: "Hata",
              message: response?.data?.message,
              icon: <BiErrorCircle />,
            });
        })
        .catch(function (error, response) {
          showNotification({
            title: "Hata",
            message: response?.data?.message,
          });
          console.log(error);
        });
    },
  });

  const { email, name, userName, password, confirm } = formik.values;
  return (
    <Layout>
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
          <CustomCheckbox name="confirm" onChange={formik.handleChange} error={formik.touched.confirm && formik.errors.confirm} value={confirm} mt="md" label="Kabul ediyorum" />
          <CustomButton variant="light" type="submit" children="Kayıt Ol" disabled={false} icon={<AiOutlineSend />} />
        </form>
      </FormikProvider>
    </Layout>
  );
};

export default Register;
