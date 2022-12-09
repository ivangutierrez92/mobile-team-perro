import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

export default function Comment({ comment, name, isUser }) {
  let date = comment.createdAt.split("T");

  return (
    <View style={styles.container}>
      <Image source={{ uri: comment.photo }} style={styles.image} />
      <View style={[styles.commentContainer, { backgroundColor: isUser ? "#406483" : "#107048" }]}>
        <View style={styles.commentInfo}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.date}> Date: {date[0]}</Text>
        </View>
        <View>
          <Text style={styles.comment}>{comment.comment}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 10,
    width: "100%",
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 15,
    resizeMode: "contain",
  },
  commentContainer: {
    marginLeft: 10,
    flex: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  commentInfo: {
    flexDirection: "row",
    marginBottom: 3,
    justifyContent: "space-between",
  },
  name: {
    marginRight: 10,
    color: "white",
    fontWeight: "bold",
  },
  date: {
    color: "white",
    fontSize: 12,
  },
  comment: {
    color: "white",
  },
});
