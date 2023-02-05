import { showNotification } from "@mantine/notifications";
import axios from "axios";
import Layout from "layouts/Layout";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [limit, setLimit] = useState(10);
  const [start, setStart] = useState(0);
  const url = `https://social-blogs.cyclic.app/blogs?limit=${limit}&start=${start}`;
  

  const [loading, setloading] = useState();

  const getBlog = () => {
    axios
      .get(url)
      .then((response) => {
        setloading(false);

        showNotification({ color: "green", disallowClose: true, autoClose: 3000, title: "Başarılı", message: "yenisi geldi" });
      })
      .catch((error) => {
        console.log(error);
        setloading(false);
      });
  };
  useEffect(() => {
    getBlog();
  }, []);

  return <Layout></Layout>;
};

export default Home;
