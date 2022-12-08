import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from '../views/Profile';
import SignUp from '../views/SignUp';
import Stack from './Stack';

const DrawerNav = createDrawerNavigator();

function Drawer() {
  return (
    <DrawerNav.Navigator>
      <DrawerNav.Screen name="MyTinerary" component={Stack} />
      <DrawerNav.Screen name="Sign Up" component={SignUp} />
      <DrawerNav.Screen name="Profile" component={Profile} />
    </DrawerNav.Navigator>
  );
}

export default Drawer;