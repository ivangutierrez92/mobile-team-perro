import React, { useEffect, useState } from "react";
import { REACT_APP_API_URL } from "@env";
import Separator from "../components/Separator";
import Message from "../components/Message";
import ItineraryCard from "../components/ItineraryCard";
import { FlatList } from "react-native";

export default function Itineraries({ route }) {
  const [itineraries, setItineraries] = useState([]);
  const [message, setMessage] = useState("...Loading");
  const { id } = route.params;

  useEffect(() => {
    getData();
  }, [id]);

  const getData = async () => {
    try {
      let res = await axios.get(`${REACT_APP_API_URL}/api/itineraries?cityId=${id}`);
      setItineraries(res.data.response);
      setMessage("");
    } catch (error) {
      setMessage(error.response.data.message || error.response.data || error.message);
    }
  };
  return (
    <FlatList
      data={itineraries}
      ListEmptyComponent={<Message message={message} />}
      renderItem={({ item }) => <ItineraryCard item={item} />}
      keyExtractor={item => item._id}
      ItemSeparatorComponent={Separator}
    />
  );
}
