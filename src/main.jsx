import React from 'react'
import ReactDOM from 'react-dom/client'

import { Client, Provider, cacheExchange, fetchExchange } from 'urql';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import './main.css'

//Pages
import Home from './pages/Home';
import Search from './pages/Search';
import Staff from './pages/Staff';
import HomeLayout from './layouts/HomeLayout';
import Error from './pages/Error';
import Content from './pages/ContentPage'
import Results from './components/Results';
import ResultsLayout from './layouts/ResultsLayout'
import GeneralContents from './pages/GeneralContents';
import ContentsLayout from './layouts/ContentsLayout'


//Router
const router = createBrowserRouter(
  createRoutesFromElements(
      <>
      <Route element={<HomeLayout />} >

        <Route index element={<Home />} />
        <Route path="/search/" element={<Search />} />
        <Route path="/search/*" element={<Search />} />
        <Route path="/staff/" element={<Staff />} />
        <Route path="/staff/*" element={<Staff />} />
        <Route path="/general-contents" element={<GeneralContents />} />
        <Route path="*" element={<Error />} />

      </Route>

      <Route element={<ResultsLayout />}>
            <Route path="/content" element={<Content />} />
      </Route>
      <Route element={<ContentsLayout />}>
            <Route path="/gi" element={<GeneralContents />} />
      </Route>
      </>
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
