import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";
import { ApolloProvider } from "@apollo/client/react";
import { Provider } from "react-redux";
import { persistor, store } from "@/stores/store";
import { useAppSelector } from "@/hooks/use-app-selector";
import { client } from "@/utils/apollo";
import { PersistGate } from 'redux-persist/integration/react';
import GlobalLoading from "@/components/global-loading";


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
        <PersistGate loading={<GlobalLoading/>} persistor={persistor}>
          <AppRouter />
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
