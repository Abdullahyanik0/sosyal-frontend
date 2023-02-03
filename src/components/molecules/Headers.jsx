import { ActionIcon, Button, useMantineColorScheme } from "@mantine/core";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Menu, Text } from "@mantine/core";
import { useNavigate } from "react-router";
import { showNotification } from "@mantine/notifications";
import { AiOutlineCheck } from "react-icons/ai";

const Headers = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const navigate = useNavigate();
  const singOut = () => {
    localStorage.clear();

    showNotification({
      color: "green",
      disallowClose: true,
      autoClose: 5000,
      title: "Success",
      message: "Redirect..",
      icon: <AiOutlineCheck />,
    });
    setTimeout(() => {
      navigate("/auth/login");
    }, 1000);
  };
  const sendProfile = () => {
    navigate("/profile");
  };
  return (
    <div className=" w-full h-[100px] flex justify-between items-center px-14 sticky top-0 ">
      <img className="w-52" src="https://upload.wikimedia.org/wikipedia/tr/archive/6/6f/20200713110928%21Turkcell_logo.png" alt="" />
      <div className="flex gap-x-4 items-center">
        <ActionIcon variant="outline" color={colorScheme ? "yellow" : "blue"} onClick={() => toggleColorScheme()} title="Toggle color scheme">
          {colorScheme === "dark" ? <BsFillSunFill size={18} /> : <BsFillMoonFill color="black" size={18} />}
        </ActionIcon>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Button variant="default">Toggle menu</Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Account Setting</Menu.Label>
            <Menu.Item>Settings</Menu.Item>
            <Menu.Item onClick={sendProfile}>Profile</Menu.Item>
            <Menu.Item>Messages</Menu.Item>
            <Menu.Item>Search</Menu.Item>

            <Menu.Divider />

            <Menu.Item onClick={singOut} color="red">
              Exit
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </div>
  );
};

export default Headers;
