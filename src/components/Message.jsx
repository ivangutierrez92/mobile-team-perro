import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Message({ message }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "#BC242C",
    fontSize: 24,
    textAlign: "center",
  },
});
