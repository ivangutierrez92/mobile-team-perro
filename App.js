import { NavigationContainer } from "@react-navigation/native";
import Stack from "./src/Navigation/Stack";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack />
      </NavigationContainer>
    </Provider>
  );
}
