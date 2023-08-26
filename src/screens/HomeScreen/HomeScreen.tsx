import {
  ActivityIndicator,
  FlatList,
  ViewabilityConfig,
  ViewToken,
} from 'react-native';
import FeedPost from '../../../src/components/FeedPost/';
import React, {useRef, useState} from 'react';
import {useQuery} from '@apollo/client';
import {listPosts} from './queries';
import {ListPostsQuery, ListPostsQueryVariables} from '../../API';
import ApiErrorMessage from '../../components/ApiErrorMessage/ApiErrorMessage';

const HomeScreen = () => {
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const {data, loading, error, refetch} = useQuery<
    ListPostsQuery,
    ListPostsQueryVariables
  >(listPosts, {errorPolicy: 'all'});

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

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return (
      <ApiErrorMessage title="Error fetching posts" message={error.message} />
    );
  }

  const posts = (data?.listPosts?.items || []).filter(post => !post?._deleted);

  return (
    <FlatList
      data={posts}
      renderItem={({item}) =>
        item && <FeedPost isVisible={item.id === activePostId} post={item} />
      }
      showsVerticalScrollIndicator={false}
      viewabilityConfig={viewabilityConfig}
      onViewableItemsChanged={onViewableItemsChanged.current}
      onRefresh={refetch}
      refreshing={loading}
    />
  );
};

export default HomeScreen;
