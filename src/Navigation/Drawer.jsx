import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { useDispatch, useSelector } from "react-redux";
import MyReactions from "../views/MyReactions";
import Profile from "../views/Profile";
import SignUp from "../views/SignUp";
import Stack from "./Stack";
import signInActions from "../redux/actions/signInActions";
const DrawerNav = createDrawerNavigator();

function Drawer() {
  const user = useSelector(store => store.signIn);
  const { signout } = signInActions;
  const dispatch = useDispatch();
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
        <DrawerNav.Screen name="Sign Up" component={SignUp} />
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
