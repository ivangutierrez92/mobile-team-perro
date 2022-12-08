import { View, Pressable, Image, TextInput, StyleSheet } from "react-native";
import React from "react";

export default function NewComment() {
  return (
    <View style={styles.container}>
      {/* <Image source={{ uri: user?.photo }} /> */}
      <View style={styles.inputContainer}>
        <TextInput placeholderTextColor={'#ffffff90'} style={styles.input} placeholder="Add your comment..." />
      </View>
      <Pressable style={styles.button}>
        <Image style={styles.buttonImage} source={require("../../assets/img/send.png")} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 20
  },
  inputContainer: {
    backgroundColor: "#70707091",
    flex: 1,
    borderRadius: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingTop: 3,
  },
  input: {
    color: 'white'
  },
  button: {
    backgroundColor: "#70707091",
    borderRadius: 20,
    padding: 5
  },
  buttonImage: {
    width: 25,
    height: 25,
    color: 'white'
  },
});
