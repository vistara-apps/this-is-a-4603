import React from 'react';
import { Link } from '@remix-run/react';
import { Camera, User, LogOut } from 'lucide-react';

export default function NavBar() {
  return (
    <header className="bg-surface shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Camera className="w-6 h-6 text-primary" />
          <span className="text-xl font-bold text-text">Critter Canvas</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

