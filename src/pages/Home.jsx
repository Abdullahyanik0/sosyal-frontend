import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "@mantine/core";

const Home = () => {
  const [usersData, setUsersData] = useState();
  const [userData, setUserData] = useState();
  const url = "http://localhost:4000/user";
  const urls = "http://localhost:4000/user/?id=63d6816b98820efc1ed2cda6";
  const token = localStorage.getItem("token");

  console.log(userData);

  const getUsers = () => {
    axios
      .get(url, { headers: { token } })
      .then((response) => {
        console.log(response);
        setUsersData(response?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getUser = () => {
    axios
      .get(urls, { headers: { token } })
      .then((response) => {
        console.log(response);
        setUserData(response?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getUsers();
    getUser();
  }, []);

  const rows = usersData?.map((user) => (
    <tr key={user?._id}>
      <td>{user?.email}</td>
      <td>{user?.userName}</td>
      <td>{user?.created_date}</td>
    </tr>
  ));
  return (
    <Table>
      <thead>
        <tr>
          <th>Element position</th>
          <th>Element name</th>
          <th>Atomic mass</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default Home;
