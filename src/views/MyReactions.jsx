import {ScrollView, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Title from "../components/Title";
import ReactionCard from "../components/ReactionCard";
import reactionColors from "../data/reactionColors";
import myReactionsActions from "../redux/actions/myReactionsActions"

export default function MyReactions() {
  let { getMyReactions } = myReactionsActions;
  let { id, token } = useSelector(store => store.signIn);
  let reactions = useSelector(store => store.myReactions);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyReactions({ userId: id, token }));
  }, []);

  return (
    <ScrollView style={styles.container}>
      {reactions &&
        Object.keys(reactions)
          .sort()
          .map(
            key =>
              reactions[key].length && (
                <>
                  <Title title={key} style={styles.title} />
                  {reactions[key].map(reaction => (
                    <ReactionCard
                      key={reaction._id}
                      background={reactionColors[key]}
                      name={reaction.itineraryId ? reaction.itineraryId.name : reaction.showId.name}
                      photo={reaction.itineraryId ? reaction.itineraryId.photo[0] : reaction.showId.photo}
                    />
                  ))}
                </>
              )
          )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  title: {
    color: "#BC242C",
    textAlign: "center",
    textDecorationLine: "underline",
    fontSize: 20,
  },
});
