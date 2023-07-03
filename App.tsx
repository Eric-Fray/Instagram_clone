import {View, StyleSheet, FlatList} from 'react-native';
import FeedPost from './src/components/FeedPost/';
import posts from './src/assets/data/posts.json'

const App = () => {


  return (
    <View style={styles.app}>
      <FlatList style={styles.app}
        data={posts}
        renderItem={({item}) => <FeedPost post={item} />} // { item, index }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
});

export default App;
