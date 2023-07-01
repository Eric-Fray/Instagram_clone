import {View, Text, SafeAreaView, StyleSheet, Image} from 'react-native';
import colors from './src/theme/colors';
import fonts from './src/theme/fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.post}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={{
              uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg',
            }}
            style={styles.userAvatar}
          />
          <Text style={styles.userName}>Eric</Text>

          <Entypo
            name="dots-three-horizontal"
            size={16}
            style={styles.threeDots}
          />
        </View>

        {/* Content */}
        <Image
          source={{
            uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/1.jpg',
          }}
          style={styles.image}
        />
        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.iconContainer}>
            <AntDesign
              name={'hearto'}
              size={24}
              style={styles.icon}
              color={colors.black}
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
            <Text style={styles.bold}>69 others</Text>
          </Text>

          {/* Post description */}
          <Text style={styles.text}>
            <Text style={styles.bold}>Eric</Text> A literal bunch of nonsense.
            Another line of nonsense. One more, just for good measure.
          </Text>

          {/* Comments */}
          <Text style={{color: colors.grey}}>View all 16 comments</Text>
          <View style={styles.comment}>
            <Text style={styles.commentText}>
              <Text style={styles.bold}>Eric</Text> A literal bunch of nonsense.
            </Text>
            <AntDesign
              name={'hearto'}
              size={16}
              style={styles.icon}
              color={colors.black}
            />
          </View>

          {/* Posted Date */}
          <Text style={{color: colors.grey}}>19 December, 2021</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  post: {},
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontWeight: fonts.weight.bold,
    color: colors.black,
  },
  threeDots: {
    marginLeft: 'auto',
  },
  footer: {
    padding: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  icon: {
    marginHorizontal: 5,
  },
  text: {
    color: colors.black,
  },
  bold: {
    fontWeight: fonts.weight.bold,
  },
  commentText: {
    color: colors.black,
    flex: 1,
  },
  comment: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default App;
