import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import AuthorCard from "../components/AuthorCard";

import axios from "axios";
import { REACT_APP_API_URL } from "@env";

export default function Hotel({ navigation, route }) {
  const { id } = route.params;
  let [hotel, setHotel] = useState({});

  useEffect(() => {
    axios
      .get(`${REACT_APP_API_URL}/api/hotels/${id}`)
      .then(function (response) {
        // manejar respuesta exitosa
        setHotel(response.data.response);
      })
      .catch(function (error) {
        // manejar error
      });
  }, [id]);


  const gotoNavigation =()=>{

    navigation.navigate("Show",{id:id})



  }




  return (
    <View style={styles.container}>
      <Image
        source={hotel.photo && { uri: hotel.photo[0] }}
        style={styles.HotelImage}
      />

      <AuthorCard photo={hotel.userId?.photo} name={hotel.userId?.name} />

      <View style={styles.description}>
        <Text style={styles.title}>Hotel : {hotel.name}</Text>
        <Text style={styles.descriptionText}>
          {hotel.name} building planned and conditioned to provide lodging
          services to people and that allows visitors to move around. We provide
          guests with additional services such as restaurants, swimming pools
          and childcare. For you to spend a unique moment with your family.With
          a capacity of {hotel.capacity} visitors
        </Text>
      </View>
      <View style={styles.button}>
        <Button color="#BC242C" title="SEE SHOWS!" onPress={gotoNavigation}/>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  HotelImage: {
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
