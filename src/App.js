import Routing from "./routes/Routing";
import { NotificationsProvider } from "@mantine/notifications";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./redux/store";

let persistor = persistStore(store);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MantineProvider withNormalizeCSS withGlobalStyles>
          <NotificationsProvider>
            <Routing />
          </NotificationsProvider>
        </MantineProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
