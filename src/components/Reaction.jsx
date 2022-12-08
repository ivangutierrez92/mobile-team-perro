import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import React from "react";

export default function Reaction({ icon, iconBack, reacted, count, onReaction }) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onReaction}>
        <Image style={styles.reactionImage} source={{ uri: reacted ? icon : iconBack }} />
        <Text>{count > 0 && count}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
    borderRadius: 13,
  },
  reactionImage: {
    width: 25,
    height: 25,
    borderRadius: 13,
    resizeMode: "cover",
  },
  reactionNumber: {
    marginLeft: 3,
  },
});
