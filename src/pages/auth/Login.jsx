import React from "react";
import { useFormik, FormikProvider } from "formik";
import { showNotification } from "@mantine/notifications";
import { AiOutlineMail, AiOutlineSend, AiOutlineCheck } from "react-icons/ai";
import { BiErrorCircle } from "react-icons/bi";
import axios from "axios";

//local imports
import Layout from "layouts/Layout";
import CustomInput from "components/inputs/CustomInput";
import { LoginSchema } from "utils/validation-schema";
import CustomButton from "components/buttons/CustomButton";
import { CustomPasswordInput } from "components/inputs/CustomPasswordInput";



const Login = () => {
  const url = "https://new-social-blogss.b4a.app/login";

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      console.log(values);

      axios
        .post(url, values)
        .then((response) => {
          console.log(response.data.message);
           showNotification({
            color: "green",
            disallowClose: true,
            autoClose: 5000,
            title: "Başarılı",
            message: response?.data?.message,
            icon: <AiOutlineCheck />,
          });
console.log(response?.data?.token);
          localStorage.setItem("token",response?.data?.token)
         console.log(response)
        })
        .catch((error,response) => {
          console.log(error);
          showNotification({
            color: "red",
            disallowClose: true,
            autoClose: 5000,
            title: "Hata",
            message: error?.response?.data?.message,
            icon: <BiErrorCircle />,
          });
        });
    },
  });

  const { email, password } = formik.values;
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

          <CustomPasswordInput name="password" value={password} onChange={formik.handleChange} error={formik.touched.password && formik.errors.password} />
          <CustomButton variant="light" type="submit" children="Giriş Yap" disabled={false} icon={<AiOutlineSend />} />
        </form>
      </FormikProvider>

    </Layout>
  );
};

export default Login;
