import React from 'react';
import { LayoutDashboard, Image, Upload, Settings, Heart } from 'lucide-react';
import { Link, useLocation } from '@remix-run/react';

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'gallery', label: 'Gallery', icon: Image, path: '/gallery' },
    { id: 'upload', label: 'Upload', icon: Upload, path: '/upload' },
    { id: 'favorites', label: 'Favorites', icon: Heart, path: '/favorites' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <div className="w-64 bg-surface shadow-card min-h-screen p-4">
      <div className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;
          
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-text hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
      
      <div className="mt-8 p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg">
        <h3 className="font-semibold text-sm mb-2">Upgrade Plan</h3>
        <p className="text-xs text-gray-600 mb-3">Get unlimited uploads and advanced features</p>
        <Link 
          to="/subscription/plans" 
          className="block w-full bg-primary text-white py-2 px-4 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity text-center"
        >
          Upgrade Now
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

