import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider, createHashRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./store";

import Beranda from './user/Beranda';
import Riwayat from './user/Riwayat';
import Profil from './user/Profil';
import LoginAdmin from './admin/loginAdmin';
import DropdownDoktor from './admin/DropdownDoktor';
import JadwalDokter from './admin/JadwalDokter';
import RiwayatDokter from './admin/RiwayatDokter';
import DataDokter from './admin/DataDokter';
import BuatJanji from './user/BuatJanji';
import Dokter from './user/Dokter';


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
  {
    path: "/loginAdmin",
    element: <LoginAdmin />,
  },
  {
    path: "/DropdownDoktor",
    element: <DropdownDoktor />,
  },
  {
    path: "/JadwalDokter",
    element: <JadwalDokter />,
  },
  {
    path: "/RiwayatDokter",
    element: <RiwayatDokter />,
  },
  {
    path: "/JadwalDokter",
    element: <JadwalDokter />,
  },
  {
    path: "/DataDokter",
    element: <DataDokter />,
  },
  {
    path: "/BuatJanji",
    element: <BuatJanji />
  },
  {
    path: "/dokter/:dokterId",
    element: <Dokter/>,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
     <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);