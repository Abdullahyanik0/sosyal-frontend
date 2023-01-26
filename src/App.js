import React from "react";
import Routing from "./routes/Routing";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

const App = () => {
  return (
      <MantineProvider withNormalizeCSS withGlobalStyles>
        <NotificationsProvider>
          <Routing />
        </NotificationsProvider>
      </MantineProvider>
  );
};

export default App;
