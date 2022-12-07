import { View, Text, Image, Button, StyleSheet } from "react-native";
import React from "react";

export default function CityCard({ item }) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: item.photo }} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.contentText}>Continent: {item.continent}</Text>
        <Text style={styles.contentText}>Population: {item.population.toLocaleString()}</Text>
      </View>
      <Button color={'#206045'} style={styles.button} title="See Itineraries!" />
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
