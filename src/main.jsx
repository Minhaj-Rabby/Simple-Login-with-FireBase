import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from './components/Home/Home.jsx';
import Main from './layOut/Main.jsx';
import LogIn from './components/LogIn/LogIn.jsx';
import Register from './components/Register/Register.jsx';
import Orders from './components/Orders/Orders.jsx';
import Profile from './components/Profile/Profile.jsx';

import AuthProviders from './Providers/AuthProviders';
import PrivateRoutes from './Routers/PrivateRoutes';
import Practise from './components/LogIn/practise';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: 'login',
        element: <LogIn></LogIn>
      },

      {
        path: 'register',
        element: <Register></Register>
      },
      {
        path: 'orders',
        element: <PrivateRoutes><Orders></Orders></PrivateRoutes>
      },
      {
        path: 'profile',
        element: <PrivateRoutes><Profile></Profile></PrivateRoutes>
      },
      {
        path: 'practise',
        element: <Practise></Practise>,
      },

    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProviders>
      <RouterProvider router={router}></RouterProvider>
    </AuthProviders>
  </React.StrictMode>,
)
