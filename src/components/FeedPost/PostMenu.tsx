import {Text, Alert} from 'react-native';
import React from 'react';
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
  renderers,
} from 'react-native-popup-menu';
import Entypo from 'react-native-vector-icons/Entypo';
import styles from './styles';
import {useMutation} from '@apollo/client';
import {deletePost} from './queries';
import {DeletePostMutation, DeletePostMutationVariables, Post} from '../../API';
import {useAuthContext} from '../../Contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { FeedNavigationProp } from '../../types/navigation';

interface IPostMenu {
  post: Post;
}

const PostMenu = ({post}: IPostMenu) => {
  const [doDeletePost] = useMutation<
    DeletePostMutation,
    DeletePostMutationVariables
  >(deletePost, {variables: {input: {id: post.id, _version: post._version}}});
  const {userId} = useAuthContext();
  const isMyPost = userId === post.userID;

  const navigation = useNavigation<FeedNavigationProp>();
  const startDeletingPost = async () => {
    const response = await doDeletePost();
  };
  const onDeleteOptionPressed = () => {
    Alert.alert('Are you sure?', 'Deleting a post is permanent', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete post',
        style: 'destructive',
        onPress: startDeletingPost,
      },
    ]);
  };
  const onEditOptionPressed = () => {
    navigation.navigate('UpdatePost', {id: post.id});
  };
  return (
    <Menu renderer={renderers.SlideInMenu} style={styles.threeDots}>
      <MenuTrigger>
        <Entypo name="dots-three-horizontal" size={16} />
      </MenuTrigger>
      <MenuOptions customStyles={{optionText: styles.optionText}}>
        <MenuOption text="Report" onSelect={() => Alert.alert(`Reporting`)} />
        {isMyPost && (
          <>
            <MenuOption
              text="Delete"
              onSelect={onDeleteOptionPressed}
              customStyles={{optionText: styles.optionDelete}}
            />
            <MenuOption onSelect={onEditOptionPressed} text="Edit" />
          </>
        )}
      </MenuOptions>
    </Menu>
  );
};

export default PostMenu;
