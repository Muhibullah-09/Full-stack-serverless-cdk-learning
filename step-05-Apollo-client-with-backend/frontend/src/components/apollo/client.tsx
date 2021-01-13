import fetch from "cross-fetch"
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"

export const client = new ApolloClient({
  link: new HttpLink({
    uri:
      "https://32t6cxxu5rgzrobhxpv5mg56ga.appsync-api.us-east-2.amazonaws.com/graphql", // ENTER YOUR GRAPHQL ENDPOINT HERE
    fetch,
    headers: {
      "x-api-key": "da2-yj25osr2czepnpp2xm73reme7m", // ENTER YOUR API KEY HERE
    },
  }),
  cache: new InMemoryCache(),
});