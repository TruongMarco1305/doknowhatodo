import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";

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
  return (
    <RouterProvider
      router={router}
      context={{
        authContext: { isAuthenticated: false },
      }}
    />
  );
};

function App() {
  return (
    <AppRouter />
  );
}

export default App;
