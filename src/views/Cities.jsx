import { View, Text, TextInput, StyleSheet, Button, FlatList, Pressable, Animated } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cityActions from "../redux/actions/cityActions";
import CityCard from "../components/CityCard";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import SearchBar from "../components/SearchBar";

export default function Cities() {
  const dispatch = useDispatch();
  const { getInitialData } = cityActions;
  const { cities, initial } = useSelector(store => store.city);
  useEffect(() => {
    if (initial) {
      dispatch(getInitialData({ endpoint: "/api/cities" }));
    }
  }, []);

  return (
    <FlatList
      style={styles.listContainer}
      data={cities}
      keyExtractor={item => item._id}
      renderItem={CityCard}
      ListHeaderComponent={Header}
      ItemSeparatorComponent={() => <View style={{ margin: 10 }} />}
    />
  );
}

const Header = () => {
  const [showFilter, setShowFilter] = useState(false);
  const { continents, search } = useSelector(store => store.city);
  const { getCities } = cityActions;
  const [rotateAnimation] = useState(new Animated.Value(0));

  const dispatch = useDispatch();

  const searchUpdate = text => {
    dispatch(getCities({ search: text, continents, endpoint: "/api/cities" }));
  };

  const checkboxUpdate = (isChecked, name) => {
    const newContinents = continents.map(continent => {
      if (continent.name === name) {
        return { ...continent, checked: isChecked };
      } else {
        return continent;
      }
    });
    dispatch(getCities({ search, continents: newContinents, endpoint: "/api/cities" }));
  };

  const toggleFilter = async () => {
    setShowFilter(!showFilter);
    handleAnimation();
  };

  const handleAnimation = () => {
    Animated.timing(rotateAnimation, {
      toValue: showFilter ? 0 : 1,
      duration: 330,
      useNativeDriver: true,
    }).start(() => {
      rotateAnimation.setValue(showFilter ? 0 : 1);
    });
  };

  const interpolateRotation = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const animatedStyle = {
    transform: [{ rotate: interpolateRotation }],
  };
  return (
    <>
      <SearchBar onChangeText={searchUpdate} defaultValue={search} />
      <Pressable style={styles.filterPressable} onPress={toggleFilter}>
        <Text style={styles.filterText}>Filter</Text>
        <Animated.Text style={[animatedStyle, styles.filterText]}>⌄</Animated.Text>
      </Pressable>
      {showFilter && (
        <View style={styles.checkboxContainer}>
          {continents.map(continent => (
            <BouncyCheckbox
              style={styles.checkbox}
              key={continent.name}
              onPress={isChecked => checkboxUpdate(isChecked, continent.name)}
              text={continent.name}
              textStyle={{ textDecorationLine: "none" }}
              fillColor={"#BC242C"}
              isChecked={continent.checked}
            />
          ))}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  filterPressable: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#BC242C",
    marginBottom: 20,
  },
  filterText: {
    color: "white",
  },
  listContainer: {
    backgroundColor: "#f5f5f5",
  },
  checkboxContainer: {
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  checkbox: {
    marginBottom: 10,
  },
});
