import {FlatList, ViewabilityConfig, ViewToken} from 'react-native';
import FeedPost from '../../../src/components/FeedPost/';
import posts from '../../../src/assets/data/posts.json';
import React, {useRef, useState, useEffect} from 'react';
import {listPosts} from '../../graphql/queries';
import {API, graphqlOperation} from 'aws-amplify';

export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        description
        image
        images
        video
        nofComments
        nofLikes
        userID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        User {
          id
          name
          username
          image
        }
        Comments {
          items {
            id
            comment
            User {
              id
              name
            }
          }
        }
      }
      nextToken
      startedAt
    }
  }
`;

const HomeScreen = () => {
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await API.graphql(graphqlOperation(listPosts));
    setPosts(response.data.listPosts.items);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 51,
  };

  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: Array<ViewToken>}) => {
      if (viewableItems.length > 0) {
        setActivePostId(viewableItems[0].item.id);
      }
    },
  );

  return (
    <FlatList
      data={posts}
      renderItem={({item}) => (
        <FeedPost post={item} isVisible={activePostId === item.id} />
      )}
      showsVerticalScrollIndicator={false}
      viewabilityConfig={viewabilityConfig}
      onViewableItemsChanged={onViewableItemsChanged.current}
    />
  );
};

export default HomeScreen;
