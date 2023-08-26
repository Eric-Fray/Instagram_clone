import {View, FlatList, ActivityIndicator, Text} from 'react-native';
import Comment from '../../components/Comment';
import React from 'react';
import Input from './Input';
import {useRoute} from '@react-navigation/native';
import {CommentsRouteProp} from '../../types/navigation';
import {useQuery} from '@apollo/client';
import {CommentsByPostQuery, CommentsByPostQueryVariables} from '../../API';
import {commentsByPost} from './queries';
import ApiErrorMessage from '../../components/ApiErrorMessage';

const CommentsScreen = () => {
  const route = useRoute<CommentsRouteProp>();
  const {postId} = route.params;

  const {data, loading, error} = useQuery<
    CommentsByPostQuery,
    CommentsByPostQueryVariables
  >(commentsByPost, {variables: {postID: postId}, errorPolicy: 'all'});

  const comments = data?.commentsByPost?.items.filter(comment => !comment?._deleted)

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return (
      <ApiErrorMessage
      title="Error fetching comments"
      message={error.message}
      />
    );
  }

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={comments}
        renderItem={({item}) => <Comment comment={item} includeDetails />}
        style={{padding: 10}}
        ListEmptyComponent={() => (
          <Text>No comments. Be the first comment.</Text>
        )}
      />
      <Input postId={postId} />
    </View>
  );
};

export default CommentsScreen;
