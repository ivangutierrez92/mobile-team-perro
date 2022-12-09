import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import MyReactions from "../views/MyReactions";
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
  const { signout } = signInActions;
  let user = useSelector(store => store.signIn);

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
    <DrawerNav.Navigator
      drawerContent={props => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            {user.logged && (
              <DrawerItem
                label="Logout"
                onPress={() => {
                  dispatch(signout(user.token));
                }}
              />
            )}
          </DrawerContentScrollView>
        );
      }}
    >
      <DrawerNav.Screen name="MyTinerary" component={Stack} />
      {!user.logged && (
        <>
          <DrawerNav.Screen name="Sign Up" component={SignUp} />
          <DrawerNav.Screen name="SignIn" component={SignIn} />
        </>
      )}
      {user.logged && (
        <>
          <DrawerNav.Screen name="Profile" component={Profile} />
          <DrawerNav.Screen name="My Reactions" component={MyReactions} />
        </>
      )}
    </DrawerNav.Navigator>
  );
}

export default Drawer;
