import React from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import user from '../../assets/data/user.json';
import ProfileHeader from './ProfileHeader';

const ProfileScreen = () => {
  return (
    <FlatList
      data={user.posts}
      renderItem={({item}) => (
        <Image
          source={{uri: item.image || item.images?.[0]}}
          style={{flex: 1 / 3, margin: 1, aspectRatio: 1}}
        />
      )}
      numColumns={3}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={ProfileHeader}
    />
  );
};

export default ProfileScreen;
