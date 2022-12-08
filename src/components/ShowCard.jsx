import { View, Text, Button, StyleSheet, Image } from "react-native";
import React from "react";

export default function ShowCard(item) {
  return (
    <>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: item.item.photo }} />
        <View style={styles.content}>
          <Text style={styles.title}>{item.item.name}</Text>
          <Text style={styles.contentText}>
            description: {item.item.description}
          </Text>
        </View>
        <Button color={"#00539c"} style={styles.button} title="Comments" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: 500,
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
