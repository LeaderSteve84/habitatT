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


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <Authentication />
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
    <RouterProvider router={router} />
  </React.StrictMode>,
)
