
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  Wrench, 
  Settings,
  Home
} from 'lucide-react';

const navigationItems = [
  {
    name: 'Dashboard',
    href: '/',
    icon: Home,
  },
  {
    name: 'Análise de Mecânicos',
    href: '/mechanics',
    icon: Users,
  },
  {
    name: 'Motores em Garantia',
    href: '/engines',
    icon: Wrench,
  },
  {
    name: 'Relatórios',
    href: '/reports',
    icon: BarChart3,
  },
  {
    name: 'Configurações',
    href: '/settings',
    icon: Settings,
  },
];

export const Navigation: React.FC = () => {
  return (
    <nav className="bg-gray-900 text-white w-64 min-h-screen">
      <div className="p-6">
        <h2 className="text-xl font-bold">Garantia Insights</h2>
        <p className="text-gray-400 text-sm mt-1">Analyzer</p>
      </div>
      
      <div className="px-3">
        {navigationItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg mb-1 transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm font-medium">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
