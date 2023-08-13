import {ActivityIndicator, FlatList} from 'react-native';
import React from 'react';
import UserListItem from '../../components/UserListItem';
import {useQuery} from '@apollo/client';
import {listUsers} from './queries';
import {ListUsersQuery, ListUsersQueryVariables} from '../../API';
import ApiErrorMessage from '../../components/ApiErrorMessage';

const UserSearchScreen = () => {
  const {data, loading, error, refetch} = useQuery<
    ListUsersQuery,
    ListUsersQueryVariables
  >(listUsers, {errorPolicy: 'all'});

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return (
      <ApiErrorMessage
        title="Error fetching the user"
        message={error?.message}
      />
    );
  }

  const users = (data?.listUsers?.items || []).filter(
    user => user && !user._deleted,
  );

  return (
    <FlatList
      data={users}
      renderItem={({item}) => item && <UserListItem user={item} />}
      refreshing={loading}
      onRefresh={refetch}
    />
  );
};

export default UserSearchScreen;
