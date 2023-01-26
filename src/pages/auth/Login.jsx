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
  const url = "http://localhost:4000/login";

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
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
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
