import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { CurrencyContextProvider } from './CurrencyContextProvider';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'https://pangaea-interviews.now.sh/api/graphql'
})
const client = new ApolloClient({
  cache,
  link
})

ReactDOM.render(
  <CurrencyContextProvider>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </CurrencyContextProvider>
  
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
