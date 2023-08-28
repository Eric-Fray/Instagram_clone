import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  createHttpLink,
  TypePolicies,
} from '@apollo/client';
import {createAuthLink, AuthOptions, AUTH_TYPE} from 'aws-appsync-auth-link';
import {createSubscriptionHandshakeLink} from 'aws-appsync-subscription-link';
import config from '../aws-exports';

interface IClient {
  children: React.ReactNode;
}

const url = config.aws_appsync_graphqlEndpoint;
const region = config.aws_appsync_region;
const auth: AuthOptions = {
  type: config.aws_appsync_authenticationType as AUTH_TYPE.API_KEY,
  apiKey: config.aws_appsync_apiKey,
};

const httpLink = createHttpLink({uri: url});
const link = ApolloLink.from([
  createAuthLink({url, region, auth}),
  createSubscriptionHandshakeLink({url, region, auth}, httpLink),
]);

const mergeLists = (existing = {items: []}, incoming = {items: []}) => {
  return {
    ...existing,
    ...incoming,
    items: [...(existing.items || []), ...incoming.items],
  };
};



const typePolicies: TypePolicies = {
  Query: {
    fields: {
      commentsByPost: {
        keyArgs: ['postID', 'createdAt', 'sortDirection', 'filter'],
        merge: mergeLists,
      },
      postsByDate: {
        keyArgs: ['type', 'createdAt', 'sortDirection', 'filter'],
        merge: mergeLists,
      }
    },
  },
};

const client = new ApolloClient({
  link,
  cache: new InMemoryCache({typePolicies}),
  connectToDevTools: true,
});

const Client = ({children}: IClient) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Client;
