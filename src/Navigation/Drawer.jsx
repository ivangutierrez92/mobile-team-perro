import { createDrawerNavigator } from '@react-navigation/drawer';
import SignUp from '../views/SignUp';
import Stack from './Stack';

const DrawerNav = createDrawerNavigator();

function Drawer() {
  return (
    <DrawerNav.Navigator>
      <DrawerNav.Screen name="MyTinerary" component={Stack} />
      <DrawerNav.Screen name="SignUp" component={SignUp} />
    </DrawerNav.Navigator>
  );
}

export default Drawer;