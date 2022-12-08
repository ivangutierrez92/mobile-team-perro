import { View, Button, TextInput, StyleSheet, Alert } from "react-native";
import Title from "../components/Title";
import React from "react";
import { useFormik } from "formik";
import { REACT_APP_API_URL } from "@env";
import axios from "axios";

export default function SignUp({ navigation }) {
  const onSubmit = async (formValue, resetForm) => {
    formValue.role = "user";
    try {
      let response = await axios.post(`${REACT_APP_API_URL}/api/auth/sign-up`, formValue);
      if (!response.data.success) {
        Alert.alert("Validation", response.data.message.join("\n \n"));
      } else {
        Alert.alert("Please verify your account in your email!");
        resetForm({ values: initialValues() });
        navigation.navigate("MyTinerary");
      }
    } catch (error) {
      Alert.alert("Error", error.response.data.message || error.message);
    }
  };

  const formik = useFormik({
    initialValues: initialValues(),
    onSubmit: (formValue, { resetForm }) => {
      onSubmit(formValue, resetForm);
    },
  });
  return (
    <>
      <View style={styles.container}>
        <Title title="Start your adventure!" />
        <TextInput
          onChangeText={text => formik.setFieldValue("name", text)}
          value={formik.values.name}
          name="name"
          style={styles.input}
          placeholder="Name"
        />
        <TextInput
          onChangeText={text => formik.setFieldValue("lastName", text)}
          value={formik.values.lastName}
          name="lastName"
          style={styles.input}
          placeholder="Last Name"
        />
        <TextInput
          onChangeText={text => formik.setFieldValue("email", text)}
          value={formik.values.email}
          name="email"
          style={styles.input}
          placeholder="Email Address"
        />
        <TextInput
          onChangeText={text => formik.setFieldValue("password", text)}
          value={formik.values.password}
          name="password"
          style={styles.input}
          secureTextEntry
          placeholder="Password"
        />
        <TextInput
          onChangeText={text => formik.setFieldValue("photo", text)}
          value={formik.values.photo}
          name="photo"
          style={styles.input}
          placeholder="Photo URL"
        />
        <TextInput
          onChangeText={text => formik.setFieldValue("age", text)}
          value={formik.values.age}
          name="age"
          keyboardType="number-pad"
          style={styles.input}
          placeholder="Age"
        />
        <Button color="#BC242C" title="Create Account" onPress={formik.handleSubmit} />
      </View>
    </>
  );
}

function initialValues() {
  return {
    name: "",
    lastName: "",
    email: "",
    password: "",
    photo: "",
    age: "",
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
