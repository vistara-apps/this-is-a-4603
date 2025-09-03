import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import { Link } from '@remix-run/react';

const NavBar = () => {
  return (
    <nav className="gradient-bg text-white p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-2xl font-bold">Critter Canvas</Link>
          <span className="text-sm opacity-75">Showcase Beautiful Animal Photos</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
            <input
              type="text"
              placeholder="Search photos..."
              className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
          
          <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          
          <Link to="/auth/login" className="p-2 hover:bg-white/20 rounded-lg transition-colors">
            <User className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

