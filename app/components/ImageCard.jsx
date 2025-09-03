import React from 'react';
import { Link } from '@remix-run/react';
import { Tag } from 'lucide-react';

export default function ImageCard({ photo, variant = 'withCaption' }) {
  if (variant === 'minimal') {
    return (
      <Link to={`/photos/${photo.id}`} className="flex-shrink-0 w-64">
        <div className="bg-surface rounded-lg shadow-card overflow-hidden">
          <div className="aspect-w-4 aspect-h-3 bg-gray-100">
            <img
              src={photo.url}
              alt={photo.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/photos/${photo.id}`} className="block">
      <div className="bg-surface rounded-lg shadow-card overflow-hidden h-full transition-transform hover:scale-[1.02]">
        <div className="aspect-w-4 aspect-h-3 bg-gray-100">
          <img
            src={photo.url}
            alt={photo.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-text mb-1">{photo.title}</h3>
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{photo.description}</p>
          
          <div className="flex flex-wrap gap-1">
            {photo.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
            {photo.tags.length > 3 && (
              <span className="text-xs text-gray-500">+{photo.tags.length - 3} more</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

