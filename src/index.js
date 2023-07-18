import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider, createHashRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./store"

import Beranda from './user/Beranda';
import Riwayat from './user/Riwayat';
import Profil from './user/Profil';


const router = createHashRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/Beranda",
    element: <Beranda />,
  },
  {
    path: "/Riwayat",
    element: <Riwayat />,
  },
  {
    path: "/Profil",
    element: <Profil />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
     <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);