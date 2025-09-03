import React from 'react';
import { NavLink } from '@remix-run/react';
import { Home, Image, Upload, Settings, Info } from 'lucide-react';

export default function Sidebar() {
  const navItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/gallery', label: 'Gallery', icon: Image },
    { to: '/upload', label: 'Upload', icon: Upload },
    { to: '/settings', label: 'Settings', icon: Settings },
    { to: '/about', label: 'About', icon: Info },
  ];

  return (
    <aside className="w-64 bg-surface shadow-sm hidden md:block h-[calc(100vh-64px)] sticky top-16">
      <nav className="p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

