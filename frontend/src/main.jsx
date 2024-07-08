import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './ErrorPage.jsx'

import ChatBoard from './routes/ChatBoard.jsx'
import App from './routes/App.jsx'
import LogRequest from './routes/LogRequest.jsx'
import Profile from './routes/Profile.jsx'
import UploadDoc from './routes/UploadDoc.jsx'
import ViewRequest from './routes/ViewRequest.jsx'
import Home from './routes/Home.jsx'
import './index.css'
import WelcomePage from './components/admin/WelcomePage.jsx'
import Login from './components/Login/Login.jsx'
import Authentication from './components/Login/Authentication.jsx'

import { AuthProvider } from './components/context/AuthProvider.jsx'
import AddTenant from './components/admin/AddTenant.jsx'
import ListTenants from './components/admin/ListTenants.jsx'
import ListProperty from './components/admin/ListProperty.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/home',
    element: <Home />,
    children: [
      {
        path: "/home/welcome",
        element: <WelcomePage />
      },
      {
        path: "/home/messages",
        element: <ChatBoard />
      },
      {
        path: "/home/add-tenant",
        element: <AddTenant />
      },
      {
        path: "/home/view-tenant",
        element: <ListTenants />
      },
      {
        path: "/home/view-property",
        element: <ListProperty />
      },
      {
        path: "/home/request",
        element: <LogRequest />,
        children: [
          {
            path: "/home/request/view",
            element: <ViewRequest />
          }
        ]
      },
      {
        path: "/home/profile",
        element: <Profile />
      },
      {
        path: "/home/uploaddocument",
        element: <UploadDoc />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
