import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {IUser} from '../../types/models';

interface IUserListItem {
  user: IUser;
}

const UserListItem = ({user}: IUserListItem) => {
  return (
    <View>
      <Image source={{uri: user.image}} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
  },
});

export default UserListItem;
