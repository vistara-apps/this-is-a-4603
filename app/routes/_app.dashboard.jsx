import React from 'react';
import { json } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';
import { Image, Upload, Eye, Heart } from 'lucide-react';

export const loader = async () => {
  // In a real app, this would fetch data from Supabase
  const photos = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&h=300&fit=crop',
      title: 'Golden Retriever',
      description: 'A beautiful golden retriever enjoying the sunshine',
      tags: ['dog', 'golden retriever', 'outdoor'],
      uploadDate: '2024-01-15'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop',
      title: 'Tabby Cat',
      description: 'A curious tabby cat exploring the garden',
      tags: ['cat', 'tabby', 'garden'],
      uploadDate: '2024-01-14'
    }
  ];

  return json({ photos });
};

export default function Dashboard() {
  const { photos } = useLoaderData();

  const stats = [
    { label: 'Total Photos', value: photos.length, icon: Image, color: 'bg-blue-500' },
    { label: 'Recent Uploads', value: 2, icon: Upload, color: 'bg-green-500' },
    { label: 'Views This Month', value: 1243, icon: Eye, color: 'bg-purple-500' },
    { label: 'Favorites', value: 28, icon: Heart, color: 'bg-red-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-text">Dashboard</h2>
        <Link 
          to="/upload" 
          className="bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          Upload New Photos
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-surface rounded-lg shadow-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-text">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Photos */}
      <div className="bg-surface rounded-lg shadow-card p-6">
        <h3 className="text-xl font-semibold mb-4">Recent Photos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.slice(0, 6).map((photo) => (
            <Link key={photo.id} to={`/photos/${photo.id}`} className="group cursor-pointer">
              <div className="aspect-w-16 aspect-h-12 bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="mt-2">
                <h4 className="font-medium text-text">{photo.title}</h4>
                <p className="text-sm text-gray-600">{photo.uploadDate}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

