import {View, FlatList} from 'react-native';
import comments from '../../assets/data/comments.json';
import Comment from '../../components/Comment';
import React from 'react';
import Input from './Input';
import { useRoute } from '@react-navigation/native';
import { CommentsRouteProp } from '../../types/navigation';

const CommentsScreen = () => {
  const route = useRoute<CommentsRouteProp>();
  const {postId} = route.params;
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={comments}
        renderItem={({item}) => <Comment comment={item} includeDetails />}
        style={{padding: 10}}
      />
      <Input postId={postId}/>
    </View>
  );
};

export default CommentsScreen;
