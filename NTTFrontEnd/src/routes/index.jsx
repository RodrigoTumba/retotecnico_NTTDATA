import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/Layout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Empleados from '../pages/empleados/Empleados'
import EmpleadoDetail from '../pages/empleados/EmpleadoDetail'
import Oficinas from '../pages/oficinas/Oficinas'
import OficinaDetail from '../pages/oficinas/OficinaDetail'
import ProtectedRoute from './ProtectedRoute'
import NuevoEmpleado from '../pages/empleados/NuevoEmpleado';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      {
        path: 'empleados',
        element: <ProtectedRoute><Empleados /></ProtectedRoute>,
      },
      {
        path: 'empleados/:id',
        element: <ProtectedRoute><EmpleadoDetail /></ProtectedRoute>,
      },
      {
        path: '/empleados/nuevo',
        element: <ProtectedRoute><NuevoEmpleado /></ProtectedRoute>, 
      },
      {
        path: 'oficinas',
        element: <ProtectedRoute><Oficinas /></ProtectedRoute>,
      },
      {
        path: 'oficinas/:id',
        element: <ProtectedRoute><OficinaDetail /></ProtectedRoute>,
      },
    ],
  },
])

export default router