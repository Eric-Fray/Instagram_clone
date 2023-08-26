import {View, Text, Image, TextInput, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import {useMutation} from '@apollo/client';
import {CreateCommentMutation, CreateCommentMutationVariables} from '../../API';
import {createComment} from './queries';
import { useAuthContext } from '../../Contexts/AuthContext';

interface IInput {
  postId: string;
}

const Input = ({postId}: IInput) => {
  const [newComment, setNewComment] = useState('New comment');
  const {userId} = useAuthContext();

  const [doCreateComment] = useMutation<
    CreateCommentMutation,
    CreateCommentMutationVariables
  >(createComment);

  const onPost = () => {
    doCreateComment({variables: {input: {
      postID: postId,
      userID: userId,
      comment: newComment,
    }}})

    setNewComment('');
  };
  return (
    <View style={styles.root}>
      <Image
        source={{
          uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/2.jpg',
        }}
        style={styles.image}
      />
      <TextInput
        value={newComment}
        onChangeText={setNewComment}
        placeholder="Write your comment..."
        style={styles.input}
        multiline
      />

      <Text onPress={onPost} style={styles.button}>
        POST
      </Text>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    padding: 5,
    borderTopWidth: 1,
    borderColor: colors.border,
    alignItems: 'flex-end',
  },
  image: {
    width: 40,
    aspectRatio: 1,
    borderRadius: 20,
  },

  input: {
    flex: 1,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 25,
    paddingVertical: 5,
    paddingRight: 50,
    paddingHorizontal: 10,
    marginLeft: 5,
    alignSelf: 'center',
  },
  button: {
    position: 'absolute',
    right: 10,
    bottom: 18,
    fontSize: fonts.size.sm,
    color: colors.primary,
    alignSelf: 'center',
  },
});
