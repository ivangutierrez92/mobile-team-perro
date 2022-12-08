import { View, Text, Image, Button, StyleSheet } from "react-native";
import React from "react";

export default function HotelCard({ item }) {
 

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: item.photo[0] }} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.contentText}>Capacity: {item.capacity}</Text>
        <Text style={styles.contentText}>City: {item.cityId.name}</Text>
      </View>
      <Button color={"#107048"} style={styles.button} title="Details" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: 200,
  },
  content: {
    padding: 10,
  },
  contentText: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    color: "#BC242C",
  },
});
