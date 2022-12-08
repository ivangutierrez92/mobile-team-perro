import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import hotelActions from "../redux/actions/hotelActions";
import HotelCard from "../components/HotelCard";
import SearchBar from "../components/SearchBar";
import { Picker } from "@react-native-picker/picker";

export default function Hotels({navigation}) {
  const dispatch = useDispatch();
  const { getHotelBefore } = hotelActions;
  let { hotelList, firstRender } = useSelector((store) => store.hotel);

  useEffect(() => {
    if (firstRender) {
      dispatch(getHotelBefore({ param: "/api/hotels/" }));
    }
  }, []);

  return (
    <FlatList
      style={styles.listContainer}
      data={hotelList}
      keyExtractor={(item) => item._id}
      renderItem={({item})=> <HotelCard item={item} navigation={navigation} />}
      ListHeaderComponent={Header}
      ItemSeparatorComponent={() => <View style={{ margin: 10 }} />}
    />
  );
}

const Header = () => {
  const { getHotelAfter } = hotelActions;
  const dispatch = useDispatch();
  const { name, order } = useSelector((store) => store.hotel);

  const searchUpdate = (text) => {
    dispatch(
      getHotelAfter({
        param: "/api/hotels/",
        name: text,
        order: order,
      })
    );
  };

  const select = (itemValue) => {
    dispatch(
      getHotelAfter({
        param: "/api/hotels/",
        name: name,
        order: itemValue,
      })
    );
  };

  return (
    <>
      <SearchBar onChangeText={searchUpdate} defaultValue={name} />
      <Picker
        selectedValue={order}
        onValueChange={select}
      >
        <Picker.Item label="Ascendent" value="asc" />
        <Picker.Item label="Descendent" value="desc" />
      </Picker>
    </>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: "#f5f5f5",
  },
});
