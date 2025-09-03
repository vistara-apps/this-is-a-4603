import React from 'react';
import { json } from '@remix-run/node';
import { useLoaderData, Link, useParams } from '@remix-run/react';
import { ArrowLeft, Heart, Share, Download, Edit, Tag } from 'lucide-react';

export const loader = async ({ params }) => {
  const photoId = parseInt(params.photoId);
  
  // In a real app, this would fetch data from Supabase
  const photos = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800&h=600&fit=crop',
      title: 'Golden Retriever',
      description: 'A beautiful golden retriever enjoying the sunshine in the park. This photo was taken during a summer afternoon when the light was perfect. The dog was playing fetch and took a moment to rest in the grass.',
      tags: ['dog', 'golden retriever', 'outdoor'],
      uploadDate: '2024-01-15'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=600&fit=crop',
      title: 'Tabby Cat',
      description: 'A curious tabby cat exploring the garden. This cat lives next door and often visits my garden in the morning. It loves to hide among the plants and watch the birds.',
      tags: ['cat', 'tabby', 'garden'],
      uploadDate: '2024-01-14'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=800&h=600&fit=crop',
      title: 'Fluffy Rabbit',
      description: 'An adorable fluffy rabbit in the grass. This is my pet rabbit Snowball who loves to hop around the backyard. He is about 2 years old and has the softest fur.',
      tags: ['rabbit', 'fluffy', 'outdoor'],
      uploadDate: '2024-01-13'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1497752531616-c3afd9760a11?w=800&h=600&fit=crop',
      title: 'Colorful Parrot',
      description: 'A vibrant and colorful parrot perched on a branch. I spotted this beautiful bird at the local aviary. The colors were so vivid that I had to capture it.',
      tags: ['bird', 'parrot', 'colorful'],
      uploadDate: '2024-01-12'
    }
  ];

  const photo = photos.find(p => p.id === photoId);
  
  if (!photo) {
    throw new Response('Photo not found', { status: 404 });
  }

  return json({ photo });
};

export default function PhotoDetail() {
  const { photo } = useLoaderData();
  const params = useParams();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/gallery" className="flex items-center text-gray-600 hover:text-primary">
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span>Back to Gallery</span>
        </Link>
        
        <div className="flex space-x-2">
          <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
            <Heart className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
            <Share className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
            <Download className="w-5 h-5" />
          </button>
          <Link to={`/photos/${params.photoId}/edit`} className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
            <Edit className="w-5 h-5" />
          </Link>
        </div>
      </div>
      
      <div className="bg-surface rounded-lg shadow-card overflow-hidden">
        <div className="aspect-w-16 aspect-h-9 bg-gray-100">
          <img
            src={photo.url}
            alt={photo.title}
            className="w-full object-contain max-h-[500px]"
          />
        </div>
        
        <div className="p-6">
          <h1 className="text-2xl font-bold text-text mb-2">{photo.title}</h1>
          <p className="text-sm text-gray-500 mb-4">Uploaded on {photo.uploadDate}</p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {photo.tags.map((tag, index) => (
              <Link
                key={index}
                to={`/gallery?tag=${tag}`}
                className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Link>
            ))}
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Photo Story</h2>
            <p className="text-gray-700 whitespace-pre-line">{photo.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

