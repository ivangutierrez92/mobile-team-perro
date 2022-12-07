import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

export default function AuthorCard({photo, name}) {
  return (
    <View style={styles.authorCard}>
      <Image source={{ uri: photo }} style={styles.authorPhoto} />
      <Text style={styles.authorName}>By {name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  authorCard: {
    position: "absolute",
    top: 10,
    left: 10,
    flexDirection: "row",
  },
  authorPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  authorName: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 10,
  },
});
