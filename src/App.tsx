// src/App.tsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import Header from "./components/Header/Header";
import Content from "./components/Content";
import { store } from "./store/store";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router>
          <div className="flex flex-col h-screen justify-start">
            <Header />
            <Content />
            <ToastContainer />
          </div>
        </Router>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
