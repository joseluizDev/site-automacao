import {
  IconAperture, IconCopy, IconLayoutDashboard, IconLogin,
  // cadastro de mensagens
  IconMail,
  IconTablePlus
} from '@tabler/icons-react';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },
  {
    navlabel: true,
    subheader: 'Cadastros',
  },
  {
    id: uniqueId(),
    title: 'Pedidos',
    icon: IconTablePlus,
    href: '/ui/cadastro-pedidos',
  },
  {
    id: uniqueId(),
    title: 'Mensagens',
    icon: IconMail,
    href: '/ui/cadastro-mensagens',
  },

  {
    navlabel: true,
    subheader: 'Extra',
  },
  {
    id: uniqueId(),
    title: 'Sample Page',
    icon: IconAperture,
    href: '/sample-page',
  },
  {
    id: uniqueId(),
    title: 'Shadow',
    icon: IconCopy,
    href: '/ui/shadow',
  },
  {
    id: uniqueId(),
    title: 'Login',
    icon: IconLogin,
    href: '/auth/login',
  },
];

export default Menuitems;
