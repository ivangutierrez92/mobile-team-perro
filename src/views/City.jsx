import { View, Text, Image, StyleSheet, Button } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { REACT_APP_API_URL } from "@env";
import AuthorCard from "../components/AuthorCard";
import Message from "../components/Message";

export default function City({ route }) {
  const { id } = route.params;
  const [city, setCity] = useState(null);
  useEffect(() => {
    getData();
  }, [id]);

  const [message, setMessage] = useState("...Loading");

  const getData = async () => {
    try {
      let cityRes = await axios.get(`${REACT_APP_API_URL}/api/cities/${id}`);
      setCity(cityRes.data.response);
      setMessage("");
    } catch (error) {
      setMessage(error.response.data.message || error.response.data || error.message);
    }
  };
  return city ? (
    <View style={styles.container}>
      <Image source={{ uri: city.photo }} style={styles.cityImage} />
      <AuthorCard name={city.userId.name} photo={city.userId.photo} />
      <View style={styles.description}>
        <Text style={styles.title}>{city.name}</Text>
        <Text style={styles.descriptionText}>
          {city.name} is a beautiful place in {city.continent} with a population of {city.population} people. Here you
          can see the opinion of our users of what to do here.
        </Text>
      </View>
      <View style={styles.button}>
        <Button color="#BC242C" title="See Itineraries!" />
      </View>
    </View>
  ) : (
    <Message message={message} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cityImage: {
    width: "100%",
    height: 200,
  },
  title: {
    color: "#BC242C",
    textDecorationLine: "underline",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  descriptionText: {
    color: "#BC242C",
    textAlign: "center",
  },
  button: {
    paddingHorizontal: 50,
    flex: 1,
    justifyContent: "center",
  },
});
