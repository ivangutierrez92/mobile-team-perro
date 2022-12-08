import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Title({ title }) {
  return (
  
      <Text style={styles.text}>{title}</Text>
    
  );
}

const styles = StyleSheet.create({

  text: {
    marginVertical: 20,
    color: "#BC242C",
    fontSize: 24,
    textAlign: "center",
  },
});
