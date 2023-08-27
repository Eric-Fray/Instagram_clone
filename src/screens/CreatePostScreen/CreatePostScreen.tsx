import {View, Image, StyleSheet, TextInput, Alert} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {CreateNavigationProp, CreateRouteProp} from '../../types/navigation';
import colors from '../../theme/colors';
import Button from '../../components/Button';
import {createPost} from './queries';
import {CreatePostMutation, CreatePostMutationVariables} from '../../API';
import {useMutation} from '@apollo/client';
import {useAuthContext} from '../../Contexts/AuthContext';
import Carousel from '../../components/Carousel/Carousel';
import VideoPlayer from '../../components/VideoPlayer';

const CreatePostScreen = () => {
  const route = useRoute<CreateRouteProp>();
  const {image, images, video} = route.params;
  const [description, setDescription] = useState('');
  const {userId} = useAuthContext();
  const navigation = useNavigation<CreateNavigationProp>();
  const [doCreatePost] = useMutation<
    CreatePostMutation,
    CreatePostMutationVariables
  >(createPost, {errorPolicy: 'all'});

  let content = null;

  if (image) {
    content = (
      <Image
        source={{
          uri: image,
        }}
        style={styles.image}
      />
    );
  } else if (images) {
    content = <Carousel images={images} />;
  } else if (video) {
    content = <VideoPlayer uri={video} />;
  }
  const submit = async () => {
    try {
      const response = await doCreatePost({
        variables: {
          input: {
            type: 'POST',
            description,
            image: image,
            images: images,
            video: video,
            nofComments: 0,
            nofLikes: 0,
            userID: userId,
          },
        },
      });
      console.warn(response);
      navigation.popToTop();
      navigation.navigate('HomeStack');
    } catch (e) {
      Alert.alert('Error uploading post', (e as Error).message);
    }
  };
  return (
    <View style={styles.root}>
      <View style={styles.content}>{content}</View>

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

export default CreatePostScreen;
