import React, { useState } from 'react';
import { json } from '@remix-run/node';
import { useLoaderData, useSearchParams } from '@remix-run/react';
import { Grid, Columns, LayoutGrid } from 'lucide-react';
import ImageCard from '~/components/ImageCard';

export const loader = async ({ request }) => {
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
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400&h=300&fit=crop',
      title: 'Fluffy Rabbit',
      description: 'An adorable fluffy rabbit in the grass',
      tags: ['rabbit', 'fluffy', 'outdoor'],
      uploadDate: '2024-01-13'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1497752531616-c3afd9760a11?w=400&h=300&fit=crop',
      title: 'Colorful Parrot',
      description: 'A vibrant and colorful parrot perched on a branch',
      tags: ['bird', 'parrot', 'colorful'],
      uploadDate: '2024-01-12'
    }
  ];

  const url = new URL(request.url);
  const tagFilter = url.searchParams.get('tag');

  let filteredPhotos = photos;
  if (tagFilter) {
    filteredPhotos = photos.filter(photo => photo.tags.includes(tagFilter));
  }

  return json({ photos: filteredPhotos });
};

export default function Gallery() {
  const { photos } = useLoaderData();
  const [searchParams] = useSearchParams();
  const [layout, setLayout] = useState('grid');

  const tagFilter = searchParams.get('tag');

  const layoutOptions = [
    { id: 'grid', label: 'Grid', icon: Grid },
    { id: 'masonry', label: 'Masonry', icon: Columns },
    { id: 'carousel', label: 'Carousel', icon: LayoutGrid },
  ];

  const getGridClasses = () => {
    switch (layout) {
      case 'masonry':
        return 'columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4';
      case 'carousel':
        return 'flex overflow-x-auto space-x-4 pb-4';
      default:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-text">
          {tagFilter ? `Gallery: #${tagFilter}` : 'Gallery'}
        </h2>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Layout:</span>
          {layoutOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.id}
                onClick={() => setLayout(option.id)}
                className={`p-2 rounded-lg transition-colors ${
                  layout === option.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title={option.label}
              >
                <Icon className="w-4 h-4" />
              </button>
            );
          })}
        </div>
      </div>

      <div className={getGridClasses()}>
        {photos.map((photo) => (
          <ImageCard
            key={photo.id}
            photo={photo}
            variant={layout === 'carousel' ? 'minimal' : 'withCaption'}
          />
        ))}
      </div>
    </div>
  );
}

