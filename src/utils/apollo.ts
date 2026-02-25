import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { API_URL } from "../config/env";

export const client = new ApolloClient({
  link: new HttpLink({
    uri: API_URL ? `${API_URL}/graphql` : "http://localhost:8080/graphql",
    credentials: "include",
  }),
  cache: new InMemoryCache(),
});
