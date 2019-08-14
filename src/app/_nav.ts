interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    name: 'Gráficos',
    url: '/charts',
    icon: 'icon-pie-chart'
  },
  {
    title: true,
    name: 'Cadastro'
  },
  {
    name: 'Usuários',
    url: '/users',
    icon: 'icon-user'
  },
  {
    name: 'Professores',
    url: '/teachers',
    icon: 'icon-people'
  },
  {
    name: 'Cursos',
    url: '/courses',
    icon: 'icon-book-open'
  },
  {
    name: 'Estudantes',
    url: '/students',
    icon: 'icon-pencil'
  }
];
