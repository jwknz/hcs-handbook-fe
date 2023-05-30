import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Client, Provider, cacheExchange, fetchExchange } from 'urql';

import './index.css'

const client = new Client({
  url: import.meta.env.URL,
  exchanges: [cacheExchange, fetchExchange],
  // fetchOptions: () => {
  //   const token = getToken();
  //   return {
  //     headers: { authorization: token ? `Bearer ${token}` : '' },
  //   };
  // },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider value={client}>
      <App />
    </Provider>
  </React.StrictMode>,
)
