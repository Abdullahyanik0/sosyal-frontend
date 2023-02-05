import React, { useEffect, useState } from "react";
import axios from "axios";
import { showNotification } from "@mantine/notifications";
import { BiErrorCircle } from "react-icons/bi";
import { FormikProvider, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCheck, AiOutlineMail, AiOutlineSend, AiOutlineUser, AiOutlineUserDelete } from "react-icons/ai";

//local imports
import Layout from "layouts/Layout";
import CustomInput from "components/inputs/CustomInput";
import CustomButton from "components/buttons/CustomButton";
import { addUser } from "redux/UserStore";
import { useNavigate } from "react-router";

const Profile = () => {
  const [loading, setloading] = useState();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const userId = user?._id;
  const url = `https://social-blogs.cyclic.app/profile/${userId}`;
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      name: "",
    },
    /*  validationSchema: LoginSchema, */
    onSubmit: (values) => {
      console.log(values);
      setloading(true);

      axios
        .put(url, values)
        .then((response) => {
          const users = response?.data?.result;
          setloading(false);
          dispatch(addUser(users));

          showNotification({ color: "green", disallowClose: true, autoClose: 3000, title: "Başarılı", message: response?.data?.message, icon: <AiOutlineCheck /> });
        })
        .catch((error) => {
          console.log(error);
          setloading(false);
          showNotification({ color: "red", disallowClose: true, autoClose: 3000, title: "Hata", message: error?.response?.data?.message, icon: <BiErrorCircle /> });
        });
    },
  });

  useEffect(() => {
    formik.setFieldValue("email", user?.email);
    formik.setFieldValue("userName", user?.userName);
    formik.setFieldValue("name", user?.name);
  }, []);

  const { email, name, userName } = formik.values;
  const { dirty } = formik;

  const handleDelete = () => {
    const deleteUrl = `https://social-blogs.cyclic.app/deleteuser/${userId}`;
    axios
      .post(deleteUrl)
      .then((response) => {
        setloading(false);
         localStorage.clear();

        showNotification({
          color: "green",
          disallowClose: true,
          autoClose: 3000,
          title: "Success",
          message: response?.data?.message,
          icon: <AiOutlineCheck />,
        });
        setTimeout(() => {
          navigate("/auth/login");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        setloading(false);
        showNotification({ color: "red", disallowClose: true, autoClose: 3000, title: "Hata", message: error?.response?.data?.message, icon: <BiErrorCircle /> });
      });
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center">
        <img
          className="rounded-full w-52 h-52 object-cover"
          src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
          alt=""
        />
        <h1>{user?.userName}</h1>
        <FormikProvider value={formik}>
          <form className="w-[95%] sm:w-[450px]" onSubmit={formik.handleSubmit}>
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
            <CustomButton className="mt-4" fullWidth={true} variant="light" type="submit" children="Save" disabled={!dirty} loading={loading} icon={<AiOutlineSend />} />
          </form>
        </FormikProvider>
        <div className="w-[95%] sm:w-[450px]">
          <CustomButton
            className="mt-4"
            fullWidth={true}
            onClick={handleDelete}
            variant="light"
            color="red"
            type="submit"
            children="Delete my account "
            disabled={!dirty}
            loading={loading}
            icon={<AiOutlineUserDelete />}
          />
          <div>created_date:{user?.created_date}</div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
