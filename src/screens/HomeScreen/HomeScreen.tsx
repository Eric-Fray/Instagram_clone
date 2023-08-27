import {
  ActivityIndicator,
  FlatList,
  ViewabilityConfig,
  ViewToken,
} from 'react-native';
import FeedPost from '../../../src/components/FeedPost/';
import React, {useRef, useState} from 'react';
import {useQuery} from '@apollo/client';
import {postsByDate} from './queries';
import {ModelSortDirection, PostsByDateQuery, PostsByDateQueryVariables} from '../../API';
import ApiErrorMessage from '../../components/ApiErrorMessage/ApiErrorMessage';

const HomeScreen = () => {
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const {data, loading, error, refetch} = useQuery<
    PostsByDateQuery,
    PostsByDateQueryVariables
  >(postsByDate, {variables: {type: 'POST', sortDirection: ModelSortDirection.DESC}, errorPolicy: 'all'});

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

  const posts = (data?.postsByDate?.items || []).filter(post => !post?._deleted);

  console.warn(posts);

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
