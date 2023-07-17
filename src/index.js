import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider, createHashRouter } from "react-router-dom";
import Beranda from './user/Beranda';

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/Beranda",
    element: <Beranda />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);