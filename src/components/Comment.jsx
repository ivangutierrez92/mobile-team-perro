import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "react-native-web";

export default function Comment({ comment, name }) {
  let date = comment.createdAt.split("T");

  return (
    <View style={styles.container}>
      <Image source={{ uri: comment.photo }} style={styles.image} />
      <View style={styles.commentContainer}>
        <View style={styles.commentInfo}>
          <Text>{name}</Text>
          <Text>Date: {date[0]}</Text>
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
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 15,
    resizeMode: "contain",
  },
  commentContainer: {
    backgroundColor: "#107048",
  },
  commentInfo: {
    flexDirection: "row",
  },
  comment: {
    flex: 1,
  },
});
