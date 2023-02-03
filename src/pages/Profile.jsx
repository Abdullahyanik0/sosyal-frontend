import React, { useEffect, useState } from "react";
import { Tabs, Text } from "@mantine/core";

//local imports
import Layout from "layouts/Layout";
import axios from "axios";

const Profile = () => {
  const [data, setData] = useState();
  console.log(data);
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user?.email);
  const url = `https://cerulean-fossa-cap.cyclic.app/user/${user?.email}`;

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        console.log("data", response?.data?.user);
        setData(response?.data?.user);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [ url]);

  return (
    <Layout>
      <Tabs defaultValue="gallery" orientation="vertical">
        <Tabs.List>
          <Tabs.Tab value="gallery">Account</Tabs.Tab>
          <Tabs.Tab value="messages">Messages</Tabs.Tab>
          <Tabs.Tab value="settings">Settings</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="gallery">
          <Text>{data?.name}</Text>
        </Tabs.Panel>
        <Tabs.Panel value="messages">Messages tab content</Tabs.Panel>
        <Tabs.Panel value="settings">Settings tab content</Tabs.Panel>
      </Tabs>
    </Layout>
  );
};

export default Profile;
