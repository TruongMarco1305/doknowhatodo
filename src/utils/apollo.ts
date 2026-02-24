import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { SetContextLink } from '@apollo/client/link/context'
import { API_URL } from "../config/env";

const getAccessToken = () => {
  const name = "accessToken=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let cookie of cookieArray) {
    cookie = cookie.trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length);
    }
  }
  return null;
};

const httpLink = new HttpLink({
  uri: API_URL || "http://localhost:8080",
});

const authLink  = new SetContextLink(({ headers }) => {
  const token = getAccessToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    }
  }
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
