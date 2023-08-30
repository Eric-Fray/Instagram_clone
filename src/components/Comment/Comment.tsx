import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import colors from '../../theme/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React, {useState} from 'react';
import fonts from '../../theme/fonts';
import {Comment as CommentType} from '../../API';
import {DEFAULT_USER_IMAGE} from '../../config';

interface ICommentProps {
  comment: CommentType;
  includeDetails?: boolean;
  isNew?: boolean;
}

const Comment = ({
  comment,
  includeDetails = false,
  isNew = false,
}: ICommentProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const dayjs = require('dayjs');
  const relativeTime = require('dayjs/plugin/relativeTime');
  dayjs.extend(relativeTime);

  const toggleLike = () => {
    setIsLiked(v => !v);
  };

  return (
    <View style={styles.comment}>
      {includeDetails && (
        <Image
          source={{uri: comment.User?.image || DEFAULT_USER_IMAGE}}
          style={styles.avatar}
        />
      )}
      <View style={styles.middleColumn}>
        <Text style={styles.commentText}>
          <Text style={styles.bold}>{comment.User?.username}</Text>{' '}
          {comment.comment}
        </Text>
        {includeDetails && (
          <View style={styles.footer}>
            {isNew && <Text style={styles.new}>New!</Text>}
            <Text style={styles.footerText}>
              {dayjs(comment.createdAt).fromNow()}
            </Text>
            <Text style={styles.footerText}>5 likes</Text>
            <Text style={styles.footerText}>Reply</Text>
          </View>
        )}
      </View>
      <Pressable onPress={toggleLike} hitSlop={5}>
        <AntDesign
          name={isLiked ? 'heart' : 'hearto'}
          size={16}
          style={styles.icon}
          color={isLiked ? colors.accent : colors.black}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  comment: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 5,
  },
  bold: {
    fontWeight: fonts.weight.bold,
  },
  commentText: {
    color: colors.black,
    lineHeight: 18,
  },
  avatar: {
    width: 40,
    aspectRatio: 1,
    borderRadius: 25,
    marginRight: 5,
  },
  middleColumn: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  footerText: {
    marginRight: 10,
  },
  new: {
    backgroundColor: colors.primary,
    color: colors.white,
    paddingHorizontal: 5,
    marginRight: 5,
    borderRadius: 5,
    overflow: 'hidden',
  }
});

export default Comment;
