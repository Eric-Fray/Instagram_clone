import { useState } from 'react';
import {View, Text, SafeAreaView, Image, Pressable} from 'react-native';
import colors from '../../theme/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import styles from './styles';
import Comment from '../Comment';
import { IPost } from '../../types/models';

interface IFeedPost {
  post: IPost;
}

const FeedPost = ({post}: IFeedPost) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const toggleDescriptionExpanded = () => {
    setIsDescriptionExpanded ((v) => !v);
    //setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const toggleLike = () => {
    setIsLiked ((v) => !v);
  };

  let lastTap = 0;
  const handleDoublePress = () => {
    const now = Date.now();
    if (now - lastTap  < 300) {
      toggleLike();
    }

    lastTap = now;
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.post}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={{
              uri: post.user.image,
            }}
            style={styles.userAvatar}
          />
          <Text style={styles.userName}>{post.user.username}</Text>

          <Entypo
            name="dots-three-horizontal"
            size={16}
            style={styles.threeDots}
          />
        </View>

        {/* Content */}
        <Pressable onPress={handleDoublePress}>
          <Image 
            source={{
              uri: post.image,
            }}
            style={styles.image}
          />
        </Pressable>
        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.iconContainer}>
            <AntDesign onPress={toggleLike}
              name={isLiked ? 'heart' : 'hearto'}
              size={24}
              style={styles.icon}
              color={isLiked ? colors.accent : colors.black }
            />
            <Ionicons
              name="chatbubble-outline"
              size={24}
              style={styles.icon}
              color={colors.black}
            />
            <Feather
              name="send"
              size={24}
              style={styles.icon}
              color={colors.black}
            />
            <Feather
              name="bookmark"
              size={24}
              style={{marginLeft: 'auto'}}
              color={colors.black}
            />
          </View>

          {/* Likes */}
          <Text style={styles.text}>
            Liked by <Text style={styles.bold}>blahblah</Text> and{' '}
            <Text style={styles.bold}>{post.nofLikes} others</Text>
          </Text>

          {/* Post description */}
          <Text style={styles.text} numberOfLines={isDescriptionExpanded ? 0 : 3}>
            <Text style={styles.bold}>{post.user.username}</Text>{' '}
            {post.description}
          </Text>
          <Text style={{color: colors.grey}} onPress={toggleDescriptionExpanded}>{isDescriptionExpanded ? 'less' : 'more'}</Text>

          {/* Comments */}
          <Text style={{color: colors.grey}}>
            View all {post.nofComments} comments
          </Text>
          {post.comments.map(comment => (
            <Comment key={comment.id} comment={comment}/>
          ))}

          {/* Posted Date */}
          <Text style={{color: colors.grey}}>{post.createdAt}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FeedPost;
