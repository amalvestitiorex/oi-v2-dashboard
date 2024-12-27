import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "semantic-ui-css/semantic.min.css";

import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

import { Flip, ToastContainer } from "react-toastify";
import { App } from "./App.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
        <ToastContainer
          position={"top-center"}
          autoClose={5000}
          limit={4}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="light"
          transition={Flip}
        />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
