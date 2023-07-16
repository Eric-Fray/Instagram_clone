import React from 'react';
import {Image, Text, View} from 'react-native';
import user from '../../assets/data/user.json';
import styles from './styles';
import Button from '../../components/Button';

const ProfileHeader = () => {
    return (
      <View style={styles.root}>
        <View style={styles.headerRow}>
          {/* Profile Image */}
          <Image source={{uri: user.image}} style={styles.avatar} />
  
          {/* Posts, followers, following */}
          <View style={styles.numberContainer}>
            <Text style={styles.numberText}>98</Text>
            <Text>Posts</Text>
          </View>
  
          {/* Posts, followers, following */}
          <View style={styles.numberContainer}>
            <Text style={styles.numberText}>198</Text>
            <Text>Followers</Text>
          </View>
  
          {/* Posts, followers, following */}
          <View style={styles.numberContainer}>
            <Text style={styles.numberText}>298</Text>
            <Text>Following</Text>
          </View>
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.bio}>{user.bio}</Text>
  
        {/* Button */}
        <View style={{flexDirection: 'row'}}>
          <Button
            text="Edit Profile"
            onPress={() => console.warn('Pressed the edit profile button')}
          />
          <Button
            text="Another Button"
            onPress={() => console.warn('You get NOTHING')}
          />
        </View>
      </View>
    );
  };

export default ProfileHeader;