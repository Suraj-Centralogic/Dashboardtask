import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  from,
  Observable,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const httpLink = new HttpLink({ uri: 'https://graphqlzero.almansi.me/api' });

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    operation.setContext(({ headers = {} }) => ({
      headers: { ...headers, Authorization: `Bearer ${token}` },
    }));
  }
  return forward(operation);
});

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err.extensions?.code === 'UNAUTHENTICATED') {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) return;

        return new Observable(
          (observer: {
            next: { bind: (arg0: any) => any };
            error: { (arg0: any): any; (arg0: any): any; bind: any };
            complete: { bind: (arg0: any) => any };
          }) => {
            fetch('https://your-api.com/refresh', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ token: refreshToken }),
            })
              .then((res) => res.json())
              .then((data) => {
                const newAccessToken = data.accessToken;
                localStorage.setItem('accessToken', newAccessToken);

                operation.setContext(({ headers = {} }) => ({
                  headers: {
                    ...headers,
                    Authorization: `Bearer ${newAccessToken}`,
                  },
                }));

                forward(operation).subscribe({
                  next: observer.next.bind(observer),
                  error: observer.error.bind(observer),
                  complete: observer.complete.bind(observer),
                });
              })
              .catch((err) => observer.error(err));
          }
        );
      }
    }
  }
});

const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
