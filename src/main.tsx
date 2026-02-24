import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import { ApolloProvider } from '@apollo/client/react'
import { client } from "./utils/apollo";
import { Provider } from 'react-redux'
import { store } from "./stores/store";

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <App/>
        </Provider>
      </ApolloProvider>
    </StrictMode>,
  );
}
