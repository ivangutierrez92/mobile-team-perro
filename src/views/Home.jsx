import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  Button,
  Alert,
} from "react-native";
import React from "react";

export default function Home({ navigation }) {
  return (
    <View style={styles.primerView}>
      <ImageBackground
        source={require("../../assets/img/banner.jpg")}
        style={styles.banner}
      >
        <View style={styles.container}>
          <View style={styles.containerImage}>
            <Image
              source={require("../../assets/img/logo-my-tinerary.png")}
              style={styles.imageLogo}
            />
          </View>
          <View>
            <Text style={styles.text}>
              If not now, then when? Travel with us to your next adventure
            </Text>
          </View>
          <View style={styles.containerButtons}>
            <Button
              title="Explore Cities"
              color="#BC242C"
              onPress={() => {
                navigation.navigate("Cities");
              }}
            />
            <Button
              style={styles.buttons}
              title="Explore Hotels"
              color="#BC242C"
              onPress={() => {
                navigation.navigate("Hotels");
              }}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  primerView: {
    flex: 1,
  },

  container: {
    flex: 1,
    justifyContent: "space-evenly",
    marginHorizontal: 10,
  },

  containerButtons: {
    // marginBottom: 50,
    height: 100,

    display: "flex",
    justifyContent: "space-between",
  },
  containerImage: {},

  logo192: {
    width: "20%",
    resizeMode: "contain",
  },
  imageLogo: {
    height: 150,
    width: "90%",
    resizeMode: "contain",
  },
  banner: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  text: {
    color: "white",
    fontSize: 40,
    textAlign: "center",
  },
});
