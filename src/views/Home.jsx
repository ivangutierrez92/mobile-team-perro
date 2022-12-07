import { View, Text, ImageBackground, StyleSheet, Image } from "react-native";
import React from "react";

export default function Home() {
  return (
    <View>
      <ImageBackground
        source={require("../../assets/img/banner.jpg")}
        style={styles.banner}
      >
        <Text style={styles.text}>
          If not now, then when? Travel with us to your next adventure
        </Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
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
