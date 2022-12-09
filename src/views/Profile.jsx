import { View, Text, Image, StyleSheet, Button } from "react-native";
import React, { useEffect, useState } from "react";
import Message from "../components/Message";
import axios from "axios";
import { useSelector } from "react-redux";
import { REACT_APP_API_URL } from "@env";

export default function Profile({navigation}) {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("...Loading");
  const signInUser = useSelector(store => store.signIn);
  
  useEffect(() => {
    onLoading();
  }, [user]);

  const onLoading = async () => {
    let headers = { headers: { Authorization: `Bearer ${signInUser.token}` } };
    try {
      let res = await axios.get(`${REACT_APP_API_URL}/api/auth/me/${signInUser.id}`, headers);
      setUser(res.data.response);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || error.response.data);
      } else {
        setMessage(error.message);
      }
    }
  };

  const goNavigation = ()=>{
    navigation.navigate("EditProfile")
  }

  return user ? (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: user.photo }} />
      <Text style={styles.title}>
        {user.name} {user.lastName}
      </Text>
      <Text style={styles.text}>Email: {user.email}</Text>
      <Text style={styles.text}>Age: {user.age}</Text>
      <Button color="#BC242C" title="Edit Profile"  onPress={goNavigation} />
    </View>
  ) : (
    <Message message={message} />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 50
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: "cover",
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    marginBottom: 20,
  },
});
