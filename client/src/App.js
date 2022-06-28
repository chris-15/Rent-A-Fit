import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import AddPost from './components/AddPost'
import OrderHistory from "./pages/OrderHistory";
import Signup from "./pages/Signup";
import Nav from "./components/Nav";
import Profile from "./pages/Profile";
import Footer from './components/Footer'
import { StoreProvider } from "./utils/GlobalState";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <StoreProvider>
  
            <Nav />
            <Routes>
              <Route path='/addpost' element={<AddPost />} />
              <Route path="/profile/:username" element={<Profile />} />
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/orderHistory" element={<OrderHistory />} />
              <Route path="/products/:id" element={<Detail />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
            <Footer />
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
