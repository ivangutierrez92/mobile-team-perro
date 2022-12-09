import React, { useEffect, useState } from "react";
import { REACT_APP_API_URL } from "@env";
import Separator from "../components/Separator";
import Message from "../components/Message";
import ItineraryCard from "../components/ItineraryCard";
import { FlatList, View } from "react-native";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import reactionsActions from "../redux/actions/reactionsActions";

export default function Itineraries({ route }) {
  const [itineraries, setItineraries] = useState([]);
  const [message, setMessage] = useState("...Loading");
  const dispatch = useDispatch();
  const {token} = useSelector(store => store.signIn);
  const {getReactions} = reactionsActions;
  const { id } = route.params;

  useEffect(() => {
    getData();
  }, [id]);

  const getData = async () => {
    try {
      let res = await axios.get(`${REACT_APP_API_URL}/api/itineraries?cityId=${id}`);
      setItineraries(res.data.response);
      setMessage("");
      dispatch(getReactions({itineraries: res.data.response, token }))
    } catch (error) {
      setMessage(error.response.data.message || error.response.data || error.message);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={itineraries}
        ListEmptyComponent={<Message message={message} />}
        renderItem={({ item }) => <ItineraryCard item={item} />}
        ListHeaderComponent={Separator}
        keyExtractor={item => item._id}
        ItemSeparatorComponent={Separator}
      />
    </View>
  );
}
