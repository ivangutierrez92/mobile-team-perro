import { View, Text, StyleSheet, Button, TextInput, Alert } from "react-native";
import Title from "../components/Title";
import React from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import signInActions from "../redux/actions/signInActions";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();
  let { sendData } = signInActions;
  const formik = useFormik({
    initialValues: initialValues(),
    onSubmit: (formValue) => {
      send(formValue);
    },
  });

  const send = async (formValue) => {
    try {
      let res = await dispatch(sendData(formValue)).unwrap();
      if (res.success) {
        await AsyncStorage.setItem(
          "token",
          JSON.stringify({ token: { user: res.response.token } })
        );
        Alert.alert(res.message);
        navigation.navigate("MyTinerary");
      } else {
        Alert.alert("Error", res.message.join("\n \n"));
      }
    } catch (error) {}
  };

  return (
    <>
      <View style={styles.container}>
        <Title title="Sign In" />
        <TextInput
          onChangeText={(text) => formik.setFieldValue("email", text)}
          value={formik.values.email}
          name="email"
          style={styles.input}
          placeholder="Email Address"
        />
        <TextInput
          onChangeText={(text) => formik.setFieldValue("password", text)}
          value={formik.values.password}
          name="password"
          style={styles.input}
          secureTextEntry
          placeholder="Password"
        />
        <Button color="#BC242C" title="Sign In" onPress={formik.handleSubmit} />
      </View>
    </>
  );
}

function initialValues() {
  return {
    email: "",
    password: "",
  };
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    flex: 1,
  },
  input: {
    marginBottom: 20,
    borderColor: "lightgray",
    borderRadius: 5,
    paddingLeft: 5,
    borderWidth: 1,
  },
  button: {
    marginTop: 30,
  },
});
