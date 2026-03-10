import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT || "http://localhost:8080/v1/graphql",
    headers: {
      "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET || "",
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
