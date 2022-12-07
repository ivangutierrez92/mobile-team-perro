import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Cities from '../views/Cities';
import City from '../views/City';
import Home from '../views/Home';
import Hotels from '../views/Hotels';
const StackNav = createNativeStackNavigator();

export default function Stack() {
  return (
    <StackNav.Navigator>
      <StackNav.Screen name="Cities" component={Cities} />
      <StackNav.Screen name="City" component={City} />
      <StackNav.Screen name="Home" component={Home} />
      <StackNav.Screen name="Hotels" component={Hotels} />
    </StackNav.Navigator>
  )
}