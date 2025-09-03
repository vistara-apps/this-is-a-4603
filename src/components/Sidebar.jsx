import React from 'react'
import { LayoutDashboard, Image, Upload, Settings, Heart } from 'lucide-react'

const Sidebar = ({ currentView, setCurrentView }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'gallery', label: 'Gallery', icon: Image },
    { id: 'upload', label: 'Upload', icon: Upload },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="w-64 bg-surface shadow-card min-h-screen p-4">
      <div className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${
                currentView === item.id
                  ? 'bg-primary text-white'
                  : 'text-text hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
      
      <div className="mt-8 p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg">
        <h3 className="font-semibold text-sm mb-2">Upgrade Plan</h3>
        <p className="text-xs text-gray-600 mb-3">Get unlimited uploads and advanced features</p>
        <button className="w-full bg-primary text-white py-2 px-4 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
          Upgrade Now
        </button>
      </div>
    </div>
  )
}

export default Sidebar