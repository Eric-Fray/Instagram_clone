import {FlatList} from 'react-native';
import React from 'react';
import FeedGridItem from './FeedGridItem';
import { Post } from '../../API';

interface IFeedGridView {
  data: (Post | null)[];
  ListHeaderComponent?:
    | React.ComponentType<any>
    | React.ReactElement
    | null
    | undefined;
  refetch: () => void;
  loading: boolean;
}

const FeedGridView = ({data, ListHeaderComponent, refetch, loading}: IFeedGridView) => {
  return (
    <FlatList
      //columnWrapperStyle={{justifyContent:'space-around', alignItems: 'flex-start'}}
      data={data}
      renderItem={({item}) => item && <FeedGridItem post={item} />}
      numColumns={3}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={ListHeaderComponent}
      style={{marginHorizontal: -1}}
      onRefresh={refetch}
      refreshing={loading}
    />
  );
};

export default FeedGridView;
