import { NavigationContainer } from "@react-navigation/native";
import Stack from "./src/Navigation/Stack";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import 'react-native-gesture-handler';
import Drawer from "./src/Navigation/Drawer";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer />
      </NavigationContainer>
    </Provider>
  );
}
