import Routing from "./routes/Routing";
import { NotificationsProvider } from "@mantine/notifications";
import { MantineProvider, ColorSchemeProvider, ColorScheme } from "@mantine/core";
import { useState } from "react";

const App = () => {
  const [colorScheme, setColorScheme] = useState("light");
  const toggleColorScheme = (value) => setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme: colorScheme }} withNormalizeCSS withGlobalStyles>
        <NotificationsProvider>
          <Routing />
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default App;
