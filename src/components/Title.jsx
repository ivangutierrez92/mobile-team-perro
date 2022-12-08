import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Title({ title }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  text: {
    color: "#BC242C",
    fontSize: 24,
    textAlign: "center",
  },
});
