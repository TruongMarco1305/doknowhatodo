import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";
import { ApolloProvider } from "@apollo/client/react";
import { Provider } from "react-redux";
import { client } from "@/utils/apollo";
import { store } from "@/stores/store";
import { ToastContainer } from "react-toastify";
import { useAppSelector } from "@/hooks/use-app-selector";
import { useEffect } from "react";

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
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const getProfile = async () => {
  
  };

  useEffect(() => {
    if (isAuthenticated) {
      getProfile();
    }
  }, [isAuthenticated, getProfile]);

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <AppRouter />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </Provider>
    </ApolloProvider>
  );
}

export default App;
