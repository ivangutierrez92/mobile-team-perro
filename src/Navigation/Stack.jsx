import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cities from "../views/Cities";
import City from "../views/City";
import Home from "../views/Home";
import Hotels from "../views/Hotels";
import Hotel from "../views/Hotel";
import Itineraries from "../views/Itineraries";
const StackNav = createNativeStackNavigator();

export default function Stack() {
  return (
    <StackNav.Navigator>
      <StackNav.Screen name="Home" component={Home} />
      <StackNav.Screen name="Cities" component={Cities} />
      <StackNav.Screen name="City" component={City} />
      <StackNav.Screen name="Itineraries" component={Itineraries} />
      <StackNav.Screen name="Hotels" component={Hotels} />
      <StackNav.Screen name="Hotel" component={Hotel} />
    </StackNav.Navigator>
  );
}
