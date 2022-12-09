import { createDrawerNavigator } from "@react-navigation/drawer";
import Profile from "../views/Profile";
import SignUp from "../views/SignUp";
import SignIn from "../views/SignIn";
import Stack from "./Stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import signInActions from "../redux/actions/signInActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const DrawerNav = createDrawerNavigator();

function Drawer() {
  let dispatch = useDispatch();
  let { resendData } = signInActions;

  let user = useSelector((store) => store.signIn);

  useEffect(() => {
    const isLogged = async () => {
      let token = await AsyncStorage.getItem("token");
      token = token ? JSON.parse(token) : null;
      if (token) {
        dispatch(resendData(token.token.user));
      }
    };
    isLogged();
  }, []);

  return (
    <DrawerNav.Navigator>
      <DrawerNav.Screen name="MyTinerary" component={Stack} />
      <DrawerNav.Screen name="Sign Up" component={SignUp} />
      <DrawerNav.Screen name="Profile" component={Profile} />
      <DrawerNav.Screen name="SignIn" component={SignIn} />
    </DrawerNav.Navigator>
  );
}

export default Drawer;
