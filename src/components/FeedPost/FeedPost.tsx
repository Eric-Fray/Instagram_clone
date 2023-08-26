import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import colors from '../../theme/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import styles from './styles';
import Comment from '../Comment';
import DoublePressable from '../DoublePressable';
import Carousel from '../Carousel/Carousel';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import {useNavigation} from '@react-navigation/native';
import {FeedNavigationProp} from '../../types/navigation';
import {Post} from '../../API';
import {DEFAULT_USER_IMAGE} from '../../config';
import PostMenu from './PostMenu';
import useLikeService from '../../services/LikeService';

interface IFeedPost {
  post: Post;
  isVisible: boolean;
}

const FeedPost = (props: IFeedPost) => {
  const {post, isVisible = false} = props;
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const {toggleLike, isLiked} = useLikeService(post);

  const postLikes = post.Likes?.items.filter(like => !like?._deleted) || [];

  const navigation = useNavigation<FeedNavigationProp>();

  const navigateToUser = () => {
    if (post.User) {
      navigation.navigate('UserProfile', {userId: post.User.id});
    }
  };

  const navigateToComments = () => {
    navigation.navigate('Comments', {postId: post.id});
  };

  const navigatetoLikes = () => {
    navigation.navigate('PostLikes', {id: post.id});
  };

  const toggleDescriptionExpanded = () => {
    setIsDescriptionExpanded(v => !v);
    //setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  let content;
  if (post.image) {
    content = (
      <DoublePressable onDoublePress={toggleLike}>
        <Image
          source={{
            uri: post.image,
          }}
          style={styles.image}
        />
      </DoublePressable>
    );
  } else if (post.images) {
    content = <Carousel images={post.images} onDoublePress={toggleLike} />;
  } else if (post.video) {
    content = (
      <DoublePressable onDoublePress={toggleLike}>
        <VideoPlayer uri={post.video} paused={!isVisible} />
      </DoublePressable>
    );
  }

  return (
    <View style={styles.post}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri: post.User?.image || DEFAULT_USER_IMAGE,
          }}
          style={styles.userAvatar}
        />
        <Text onPress={navigateToUser} style={styles.userName}>
          {post.User?.username}
        </Text>
        <PostMenu post={post} />
      </View>

      {/* Content */}
      {content}

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.iconContainer}>
          <AntDesign
            onPress={toggleLike}
            name={isLiked ? 'heart' : 'hearto'}
            size={24}
            style={styles.icon}
            color={isLiked ? colors.accent : colors.black}
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
        {postLikes.length === 0 ? (
          <Text>Be the first to like this post</Text>
        ) : (
          <Text style={styles.text} onPress={navigatetoLikes}>
            Liked by{' '}
            <Text style={styles.bold}>{postLikes[0]?.User?.username}</Text>
            {postLikes.length > 1 && (
              <>
                {' '}
                and <Text style={styles.bold}>{post.nofLikes - 1} others</Text>
              </>
            )}
          </Text>
        )}
        {/* Post description */}
        <Text style={styles.text} numberOfLines={isDescriptionExpanded ? 0 : 3}>
          <Text style={styles.bold}>{post.User?.username}</Text>{' '}
          {post.description}
        </Text>
        <Text style={{color: colors.grey}} onPress={toggleDescriptionExpanded}>
          {isDescriptionExpanded ? 'less' : 'more'}
        </Text>
        {/* Comments */}
        <Text onPress={navigateToComments} style={{color: colors.grey}}>
          View all {post.nofComments} comments
        </Text>
        {(post.Comments?.items || []).map(
          comment =>
            comment && (
              <Comment key={comment.id} comment={comment} includeDetails />
            ),
        )}
        {/* Posted Date */}
        <Text style={{color: colors.grey}}>{post.createdAt}</Text>
      </View>
    </View>
  );
};

export default FeedPost;
