import {
  View,
  Image,
  StyleSheet,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  CreateNavigationProp,
  CreateRouteProp,
  UpdatePostRouteProp,
} from '../../types/navigation';
import colors from '../../theme/colors';
import Button from '../../components/Button';
import {
  GetPostQuery,
  GetPostQueryVariables,
  UpdatePostMutation,
  UpdatePostMutationVariables,
} from '../../API';
import {useAuthContext} from '../../Contexts/AuthContext';
import {getPost, updatePost} from './queries';
import ApiErrorMessage from '../../components/ApiErrorMessage';
import {useQuery, useMutation} from '@apollo/client';

const UpdatePostScreen = () => {
  const [description, setDescription] = useState('');
  const {userId} = useAuthContext();
  const navigation = useNavigation<CreateNavigationProp>();
  const route = useRoute<UpdatePostRouteProp>();
  const {id} = route.params;
  const {loading, data, error} = useQuery<GetPostQuery, GetPostQueryVariables>(
    getPost,
    {variables: {id}, errorPolicy: 'all'},
  );

  const post = data?.getPost;

  const [doUpdatePost, {error: updateError, data: updateData}] = useMutation<
    UpdatePostMutation,
    UpdatePostMutationVariables
  >(updatePost);

  useEffect(() => {
    if (post) {
      setDescription(post.description || '');
    }
  }, [post]);

  useEffect(() => {
    if (updateData) {
      navigation.goBack();
    }
  },[updateData]);

  const submit = async () => {
    if (!post) {
      return;
    }
    const response = doUpdatePost({
      variables: {input: {id: post.id, _version: post._version, description}},
    });
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error || updateError) {
    return (
      <ApiErrorMessage
        title="Failed to fetch the post"
        message={error?.message || updateError?.message}
      />
    );
  }

  return (
    <View style={styles.root}>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Description..."
        style={styles.input}
        multiline
        numberOfLines={5}
      />

      <Button text="Submit" onPress={submit} />
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 200,
    height: 200,
  },
  input: {
    marginVertical: 10,
    alignSelf: 'stretch',
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
  },
  content: {
    width: '100%',
    aspectRatio: 1,
  },
});

export default UpdatePostScreen;
