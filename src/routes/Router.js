import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')))
const CadastroPedidos = Loadable(lazy(() => import('../views/cadastro-pedidos/CadastroPedidos')))
const Shadow = Loadable(lazy(() => import('../views/utilities/Shadow')))
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));
const CadastroMensagens = Loadable(lazy(() => import('../views/cadastro-mensagens/CadastroMensagens')));
const CadastroSuporte = Loadable(lazy(() => import('../views/cadastro-suporte/CadastroSuporte')));
const VisualizarAgenda = Loadable(lazy(() => import('../views/visualizar-agenda/VisualizarAgenda')))
const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: '/dashboard', exact: true, element: <Dashboard /> },
      { path: '/ui/cadastro-pedidos', exact: true, element: <CadastroPedidos /> },
      { path: '/ui/shadow', exact: true, element: <Shadow /> },
      { path: '/ui/cadastro-mensagens', exact: true, element: <CadastroMensagens /> },
      { path: '/ui/cadastro-suporte', exact: true, element: <CadastroSuporte /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
      { path: '/ui/visualizar-agenda', exact: true, element: <VisualizarAgenda /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '/auth/login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
