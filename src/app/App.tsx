import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";
import { ApolloProvider } from "@apollo/client/react";
import { Provider } from "react-redux";
import { store } from "@/stores/store";
import { useAppSelector } from "@/hooks/use-app-selector";
import { client } from "@/utils/apollo";

const router = createRouter({
  routeTree,
  context: {
    authContext: { isAuthenticated: false },
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const AppRouter = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  return (
    <RouterProvider
      router={router}
      context={{
        authContext: { isAuthenticated },
      }}
    />
  );
};

function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </ApolloProvider>
  );
}

export default App;
