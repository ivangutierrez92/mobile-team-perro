import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Cities from '../views/Cities';
import Home from '../views/Home';
import Hotels from '../views/Hotels';
const StackNav = createNativeStackNavigator();

export default function Stack() {
  return (
    <StackNav.Navigator>
      <StackNav.Screen name="Home" component={Home} />
      <StackNav.Screen name="Cities" component={Cities} />
      <StackNav.Screen name="Hotels" component={Hotels} />
    </StackNav.Navigator>
  )
}