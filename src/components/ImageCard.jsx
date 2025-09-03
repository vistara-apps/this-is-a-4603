import React, { useState } from 'react'
import { Heart, Share, Download } from 'lucide-react'

const ImageCard = ({ photo, variant = 'withCaption' }) => {
  const [isLiked, setIsLiked] = useState(false)

  if (variant === 'minimal') {
    return (
      <div className="flex-shrink-0 w-64">
        <img
          src={photo.url}
          alt={photo.title}
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>
    )
  }

  return (
    <div className="bg-surface rounded-lg shadow-card overflow-hidden group hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={photo.url}
          alt={photo.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
        />
        
        <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
              isLiked ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600'
            }`}
          >
            <Heart className="w-4 h-4" fill={isLiked ? 'currentColor' : 'none'} />
          </button>
          
          <button className="p-2 rounded-full bg-white/80 text-gray-600 hover:bg-white transition-colors">
            <Share className="w-4 h-4" />
          </button>
          
          <button className="p-2 rounded-full bg-white/80 text-gray-600 hover:bg-white transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-text mb-1">{photo.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{photo.description}</p>
        
        <div className="flex flex-wrap gap-1 mb-2">
          {photo.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <p className="text-xs text-gray-500">{photo.uploadDate}</p>
      </div>
    </div>
  )
}

export default ImageCard