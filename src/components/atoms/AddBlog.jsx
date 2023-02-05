import { Modal } from "@mantine/core";
import CustomButton from "components/buttons/CustomButton";
import React, { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";

const AddBlog = () => {
  const [opened, setOpened] = useState(false);
    const user = useSelector((state) => state.user.user);

  return (
    <>
      {" "}
      <CustomButton className="mt-4" fullWidth={false} onClick={() => setOpened(true)} variant="light" type="submit" children="Add Blog " icon={<IoIosAddCircleOutline />} />{" "}
      <Modal size="80%" transition="fade" transitionDuration={600} transitionTimingFunction="ease" opened={opened} onClose={() => setOpened(false)}>
        {user && user?.name ? "var" : "yok"}
      </Modal>
    </>
  );
};

export default AddBlog;
