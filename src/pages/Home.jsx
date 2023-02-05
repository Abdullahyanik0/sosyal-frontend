import { Grid, SimpleGrid } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import AddBlog from "components/atoms/AddBlog";
import BlogCard from "components/atoms/BlogCard";
import Skeleton from "components/atoms/Skeleton";
import Layout from "layouts/Layout";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [limit, setLimit] = useState(10);
  const [start, setStart] = useState(0);
  const [data, setData] = useState();
  console.log(data);

  const url = `https://social-blogs.cyclic.app/blogs?limit=${limit}&start=${start}`;

  const [loading, setloading] = useState(true);

  const getBlog = () => {
    setloading(true);
    axios
      .get(url)
      .then((response) => {
        setloading(false);
        setData(response?.data);
        showNotification({ color: "green", disallowClose: true, autoClose: 3000, title: "Başarılı", message: "yenisi geldi" });
      })
      .catch((error) => {
        console.log(error);
        setloading(false);
      });
  };
  useEffect(() => {
    setloading(true);
    getBlog();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col items-center ">
        <div className=" w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12 2xl:w-7/12">
          <div className="flex justify-end w-full mb-4">
            <AddBlog />
          </div>
          <SimpleGrid
            cols={2}
            spacing="lg"
            breakpoints={[
              { maxWidth: "md", cols: 2, spacing: "md" },
              { maxWidth: "sm", cols: 1, spacing: "sm" },
            ]}
          >
            {loading === true ? (
              <>
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </>
            ) : (
              data?.map((item) => (
                <BlogCard
                  key={item?._id}
                  category={item?.category}
                  createdAt={item?.createdAt}
                  description={item?.description}
                  stars={item?.stars}
                  body={item?.body}
                  title={item?.title}
                  readTime={item?.readTime}
                  image={item?.image}
                />
              ))
            )}
          </SimpleGrid>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
