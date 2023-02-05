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
import { Avatar } from "@mantine/core";
import { useDispatch } from "react-redux";
import { addUser } from "redux/UserStore";
import CustomCheckbox from "components/inputs/CustomCheckbox";

const Login = () => {
  const [loading, setloading] = useState();

  const url = "https://social-blogs.cyclic.app/login";
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      setloading(true);

      axios
        .post(url, values)
        .then((response) => {
          const users = response?.data?.user;
          dispatch(addUser(users));
          localStorage.setItem("token", response?.data?.token);

          showNotification({ color: "green", disallowClose: true, autoClose: 3000, title: "Başarılı", message: response?.data?.message, icon: <AiOutlineCheck /> });

          setTimeout(() => {
            navigate("/");
          }, 1500);
        })
        .catch((error) => {
          console.log(error);
          showNotification({ color: "red", disallowClose: true, autoClose: 3000, title: "Hata", message: error?.response?.data?.message, icon: <BiErrorCircle /> });
          setloading(false);
        });
    },
  });

  useEffect(() => {
    state && formik.setFieldValue("email", state.email);
    state && formik.setFieldValue("password", state.password);
  }, [state]);

  const { email, password } = formik.values;
  const { dirty } = formik;
  return (
    <Layout>
      {" "}
      <div className="flex flex-col justify-center items-center  mt-24">
        <div className="p-4 drop-shadow-2xl bg-white rounded-xl w-[95%] sm:w-[450px]">
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

              <CustomCheckbox name="confirm" onChange={formik.handleChange} mt="md" label="Beni Hatırla." />
              <CustomButton className="mt-4" fullWidth={true} variant="light" type="submit" children="Giriş Yap" disabled={!dirty} loading={loading} icon={<AiOutlineSend />} />
            </form>
            <div>
              <div className="flex justify-between px-10 pb-8 pt-6">
                <Avatar
                  id="1"
                  className="cursor-pointer hover:bg-slate-200"
                  size="50px"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png"
                  alt="no image here"
                  color="indigo"
                />
                <Avatar
                  id="2"
                  className="cursor-pointer hover:bg-slate-200"
                  size="50px"
                  src="https://cdn4.iconfinder.com/data/icons/social-media-icons-the-circle-set/48/twitter_circle-512.png"
                  alt="no image here"
                  color="indigo"
                />
                <Avatar
                  id="3"
                  className="cursor-pointer hover:bg-slate-200"
                  size="50px"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png"
                  alt="no image here"
                  color="indigo"
                />
              </div>
            </div>
          </FormikProvider>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
