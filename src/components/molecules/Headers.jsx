import { Avatar, Group, Text } from "@mantine/core";
import { Menu } from "@mantine/core";
import { useNavigate } from "react-router";
import { showNotification } from "@mantine/notifications";
import { AiOutlineCheck, AiOutlineUser } from "react-icons/ai";
import { useSelector } from "react-redux";
import { BiExit, BiMessageDetail, BiSearchAlt2 } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";

const Headers = () => {
  const navigate = useNavigate();
  const singOut = () => {
    localStorage.clear();

    showNotification({
      color: "green",
      disallowClose: true,
      autoClose: 3000,
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

  const user = useSelector((state) => state.user.user);

  const names = user?.name;
  const name = names?.charAt(0)?.toUpperCase() + names?.slice(1);
  const email = user?.email;
  const image = "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80";
  return (
    <div className=" w-full h-[100px] flex justify-between items-center px-2 sm:px-14 sticky top-0 ">
      <img onClick={() => navigate("/")} className="sm:w-52 w-32 cursor-pointer" src="https://www.freepnglogos.com/uploads/shopee-logo-png/shopee-logo-money-changers-with-the-best-exchange-rates-singapore-10.png" alt="" />
      <div className="flex gap-x-4 items-center">
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Group className="cursor-pointer">
              <Avatar src={image} radius="xl" />

              <div style={{ flex: 1 }}>
                <Text size="sm" weight={500}>
                  {name}
                </Text>

                <Text color="dimmed" size="xs">
                  {email}
                </Text>
              </div>
            </Group>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Account Setting</Menu.Label>
            <Menu.Item icon={<FiSettings size={20} />}>Settings</Menu.Item>
            <Menu.Item icon={<AiOutlineUser size={20} />} onClick={sendProfile}>
              Profile
            </Menu.Item>
            <Menu.Item icon={<BiMessageDetail size={20} />}>Messages</Menu.Item>
            <Menu.Item icon={<BiSearchAlt2 size={20} />}>Search</Menu.Item>

            <Menu.Divider />

            <Menu.Item icon={<BiExit size={20} />} onClick={singOut} color="red">
              Exit
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </div>
  );
};

export default Headers;
