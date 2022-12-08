import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import NewComment from "./NewComment";
import { useDispatch, useSelector } from "react-redux";
import commentsActions from "../redux/actions/commentsActions";
import Comment from "./Comment";
import Reaction from "./Reaction";

export default function ItineraryCard({ item }) {
  const [showComments, setShowComments] = useState(false);
  const user = useSelector(store => store.signIn);
  let comments = useSelector(store => store.comments);
  let reactions = useSelector(store => store.reactions);
  const dispatch = useDispatch();
  const { getInicialComments } = commentsActions;

  useEffect(() => {
    dispatch(getInicialComments({ id: item._id, query: { params: { itineraryId: item._id } } }));
  }, []);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const onReaction = (name, itineraryId) => {
    dispatch(toggleReaction({ name, itineraryId, token: user.token }));
  };
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.photo[0] }} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.contentContainer}>
        <Text style={styles.contentText}>Price: {item.price} USD.</Text>
        <Text style={styles.contentText}>Duration: {item.duration} hrs.</Text>
      </View>
      <View>
        <Pressable
          onPress={toggleComments}
          style={({ pressed }) => [styles.button, { backgroundColor: pressed ? "#00396b" : "transparent" }]}
        >
          <Text style={styles.buttonText}>Comments</Text>
        </Pressable>
      </View>
      <View>{user.logged && <NewComment user={user} />}</View>
      <View>
        {comments.length &&
          comments.map(comment => (
            <Comment
              comment={comment}
              name={comment.userId.name || user.name}
              isUser={user.id === (comment.userId._id || comment.userId)}
            />
          ))}
      </View>

      {reactions[item._id] && (
        <View>
          {reactions[item._id].map(reaction => (
            <Reaction
              key={reaction._id}
              name={reaction.name}
              icon={reaction.icon}
              iconBack={reaction.iconBack}
              reacted={reaction.reacted}
              count={reaction.userId}
              onReaction={() => onReaction(reaction.name, itinerary._id)}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#00539C",
  },
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontSize: 24,
    textDecorationLine: "underline",
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "white",
  },
  description: {
    color: "white",
    marginBottom: 10,
  },
  contentContainer: {
    marginVertical: 5,
    paddingVertical: 5,
    borderTopColor: "white",
    borderTopWidth: 1,
    borderStyle: "dashed",
    borderRadius: 1,
  },
  contentText: {
    color: "white",
    marginVertical: 5,
  },
  button: {
    borderColor: "white",
    borderWidth: 1,
    borderStyle: "solid",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
