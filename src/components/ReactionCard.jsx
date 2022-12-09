import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

export default function ReactionCard({ background = "black", name, photo }) {
  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <Text style={styles.title}>{name}</Text>
      <Image style={styles.image} source={{ uri: photo }} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 20,
  },
  title: {
    color: "white",
    textAlign: "center",
    fontSize: 24,
    textDecorationLine: "underline",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
});
