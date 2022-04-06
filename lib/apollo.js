import {ApolloClient,createHttpLink,InMemoryCache} from '@apollo/client';
import { useMemo } from 'react';
const createApolloClient = () => {
    return new ApolloClient({
        link: createHttpLink({
        uri: 'https://ebartanhasuranextjs.hasura.app/v1/graphql',
        headers: {
            'Content-Type': 'application/json',
            'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
            // Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          },
        credentials: 'include',
        }),
        cache: new InMemoryCache(),
    });
}
let apolloClient

export default function initializeApollo(initialState = null) {


    const _apolloClient = apolloClient ? apolloClient:  createApolloClient();

    if (initialState) {
       const existingCache = _apolloClient.extract();
         _apolloClient.cache.restore({...existingCache, ...initialState});
        
    }
    if (typeof window === 'undefined') return _apolloClient;

    if (!apolloClient) apolloClient = createApolloClient();

    return apolloClient;
}

export function useApollo(initialState) {
    const store = useMemo(() => initializeApollo(initialState), [initialState]);
    return store;
}