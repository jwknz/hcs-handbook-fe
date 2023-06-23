import React from 'react'
import ReactDOM from 'react-dom/client'

import { Client, Provider, cacheExchange, fetchExchange } from 'urql';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import './main.css'

//Pages
import Home from './pages/Home';
import Whanau from './pages/Whanau';
import Staff from './pages/Staff';
import HomeLayout from './layouts/HomeLayout';

//Router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/"element={<HomeLayout />}>
      <Route index element={<Home />} />
      <Route path="/whanau" element={<Whanau />} />
      <Route path="/staff" element={<Staff />} />
    </Route>
  )
)

//URQL
const client = new Client({
  url: import.meta.env.VITE_URL,
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
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
