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
import ListProperty from './components/admin/propertyManagement/ListProperty.jsx'
import AddProperty from './components/admin/propertyManagement/AddProperty.jsx'
import PublishProperty from './components/admin/propertyListing/PublishProperty.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import NewPassword from './components/Login/CreateNewPassword.jsx'
import ForgottenPassword from './components/Login/ForgottenPassword.jsx'
import MainSideBar from './components/sidebar/MainSideBar.jsx'
import ListAdProperty from './components/admin/propertyListing/ListAdProperty.jsx'

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
    path: '/about',
    element: <About />
  },
  {
    path: '/new-password',
    element: <NewPassword />
  },
  {
    path: '/forget-password',
    element: <ForgottenPassword />
  },
  {
    path: '/authenticate',
    element: <Authentication />
  },
  {
    path: '/home',

    element: <ProtectedRoute>
      <MainSideBar />
    </ProtectedRoute>,
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
        path: "/home/property-entries",
        element: <AddProperty />
      },
      {
        path: "/home/publish-property",
        element: <PublishProperty />
      },
      {
        path: "/home/advert-property",
        element: <ListAdProperty />
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
        path: "/home/update-profile",
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
