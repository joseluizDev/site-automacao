import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')));
const CadastroPedidos = Loadable(lazy(() => import('../views/cadastro-pedidos/CadastroPedidos')));
const Shadow = Loadable(lazy(() => import('../views/utilities/Shadow')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));
const CadastroMensagens = Loadable(lazy(() => import('../views/cadastro-mensagens/CadastroMensagens')));
const CadastroSuporte = Loadable(lazy(() => import('../views/cadastro-suporte/CadastroSuporte')));
const VisualizarAgenda = Loadable(lazy(() => import('../views/visualizar-agenda/VisualizarAgenda')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/ui/cadastro-pedidos', element: <CadastroPedidos /> },
      { path: '/ui/shadow', element: <Shadow /> },
      { path: '/ui/cadastro-mensagens', element: <CadastroMensagens /> },
      { path: '/ui/cadastro-suporte', element: <CadastroSuporte /> },
      { path: '/ui/visualizar-agenda', element: <VisualizarAgenda /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: 'login', element: <Login /> }, // Ajustado para 'login' ao invés de '/auth/login'
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
