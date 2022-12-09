import { View, Text, Button, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import NewComment from "./NewComment";

import { useDispatch, useSelector } from "react-redux";
import reactionsActions from "../redux/actions/reactionsActions";
import commentsActions from "../redux/actions/commentsActions";
import Comment from "./Comment";
import Reaction from "./Reaction";

export default function ShowCard({ item }) {
  const [showComments, setShowComments] = useState(false);
  const user = useSelector((store) => store.signIn);
  let comments = useSelector((store) => store.comments);
  let reactions = useSelector((store) => store.reactions);
  const dispatch = useDispatch();

  const { getInicialComments, createComment } = commentsActions;
  const { toggleReaction } = reactionsActions;

  useEffect(() => {
    dispatch(
      getInicialComments({
        id: item._id,
        query: { params: { showId: item._id } },
      })
    );
  }, []);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const onReaction = (name) => {
    dispatch(
      toggleReaction({ name, showId: item._id, token: user.token })
    );
  };

  const sendComment = (textToSend) => {
    let headers = { headers: { Authorization: `Bearer ${user.token}` } };
    let newComment = { comment: textToSend, showId: item._id };
    dispatch(createComment({ newComment, id: item._id, headers }));
  };

  return (
    <>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: item.photo }} />
        <View style={styles.content}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.contentText}>
            description: {item.description}
          </Text>
        </View>
        <Button
          color={"#00539c"}
          style={styles.button}
          title="Comments"
          onPress={toggleComments}
        />
      </View>
      {showComments && (
        <>
          <View>
            {user.logged && (
              <NewComment user={user} sendComment={sendComment} />
            )}
          </View>
          <View>
            {comments[item._id]?.map((comment) => (
              <Comment
                key={comment._id}
                comment={comment}
                name={comment.userId.name || user.name}
                isUser={user.id === (comment.userId._id || comment.userId)}
              />
            ))}
          </View>
        </>
      )}
      
      {reactions[item._id] && (
        <View style={styles.reactionContainer}>
          {reactions[item._id].map((reaction) => (
            <Reaction
              key={reaction._id}
              name={reaction.name}
              icon={reaction.icon}
              iconBack={reaction.iconBack}
              reacted={reaction.reacted}
              count={reaction.userId}
              onReaction={() => onReaction(reaction.name)}
            />
          ))}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: 500,
  },
  content: {
    padding: 10,
  },
  contentText: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    color: "#BC242C",
  },
});
