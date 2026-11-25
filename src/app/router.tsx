import { createBrowserRouter, Navigate } from 'react-router-dom'
import { LocalePage } from './LocalePage'
import { LoginPage } from './LoginPage'

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/ar" replace /> },
  { path: '/:locale/login', element: <LoginPage /> },
  { path: '/:locale', element: <LocalePage /> },
])
