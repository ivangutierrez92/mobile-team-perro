import { View, Text, StyleSheet, TextInput, Alert, Button } from "react-native";
import Title from "../components/Title";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { REACT_APP_API_URL } from "@env";
import axios from "axios";

export default function EditProfile() {
  let [getUser, setGetUser] = useState(null);
  let user = useSelector((store) => store.signIn);
  useEffect(() => {
    let headers = { headers: { Authorization: `Bearer ${user.token}` } };

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/auth/me/${user.id}`, headers)
      .then((response) => {
        setGetUser(response.data.response);
      })
      .catch((error) => {
        Alert.alert("Error", error.response.data.message);
      });
  }, []);
  console.log(getUser?.age);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: getUser?.name,
      lastName: getUser?.lastName,
      photo: getUser?.photo,
      age: getUser?.age,
    },
    onSubmit: (formValue) => {
      onSubmit(formValue);
    },
  });

  const onSubmit = (formValue) => {
    let headers = { headers: { Authorization: `Bearer ${user.token}` } };
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/api/auth/me/${user.id}`,
        formValue,
        headers
      )
      .then((response) => {
        // navigation.navigate("MyTinerary");

        Alert.alert("Your profile has been updated successfully");
      })
      .catch((error) => {
        Alert.alert(
          "Error updating your profile",
          error.response.data.message,
          "error"
        );
      });
  };

  return (
    <>
      <View style={styles.container}>
        <Title title="Edit your Profile" />
        <TextInput
          onChangeText={(text) => formik.setFieldValue("name", text)}
          value={formik.values.name}
          name="name"
          style={styles.input}
          placeholder="Name"
        />
        <TextInput
          onChangeText={(text) => formik.setFieldValue("lastName", text)}
          value={formik.values.lastName}
          name="lastName"
          style={styles.input}
          placeholder="Last Name"
        />

        <TextInput
          onChangeText={(text) => formik.setFieldValue("photo", text)}
          value={formik.values.photo}
          name="photo"
          style={styles.input}
          placeholder="Photo URL"
        />
        <TextInput
          onChangeText={(text) => formik.setFieldValue("age", text)}
          value={formik.values.age}
          name="age"
          keyboardType="number-pad"
          style={styles.input}
          placeholder="Age"
        />
        <Button
          color="#BC242C"
          title="Confirm editing"
          onPress={formik.handleSubmit}
        />
      </View>
    </>
  );
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
