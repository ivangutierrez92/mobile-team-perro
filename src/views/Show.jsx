import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import ShowCard from "../components/ShowCard";
import Message from "../components/Message";
import axios from "axios";
import { REACT_APP_API_URL } from "@env";

export default function Show({ navigation, route }) {
  const { id } = route.params;
  let [show, setShow] = useState([]);
  let [message, setMessage] = useState("...Loading");
  useEffect(() => {
    axios
      .get(`${REACT_APP_API_URL}/api/shows?hotelId=${id}`)
      .then(function (response) {
        if (response.data.response.length) {
          setShow(response.data.response);
        } else {
          setMessage("No show for this Hotel...");
        }
      })

      .catch(function (error) {
        setMessage(error.response.data.message);
      });
  }, []);

  return show.length > 0 ? (
    <FlatList
      style={styles.listContainer}
      data={show}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => <ShowCard item={item} />}
      ItemSeparatorComponent={() => <View style={{ margin: 10 }} />}
    />
  ) : (
    <Message message={message} />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: "#f5f5f5",
  },
});
