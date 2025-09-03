import React, { useRef } from 'react';
import { Upload, Image } from 'lucide-react';

export default function FileUpload({ onFilesSelected }) {
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesSelected(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(e.target.files);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-surface"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        className="hidden"
        multiple
        accept="image/*"
      />
      
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="p-4 bg-primary/10 rounded-full">
          <Image className="w-12 h-12 text-primary" />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-text mb-1">Upload Your Animal Photos</h3>
          <p className="text-gray-600 mb-4">Drag and drop your files here, or click to browse</p>
        </div>
        
        <button
          type="button"
          onClick={handleButtonClick}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center"
        >
          <Upload className="w-4 h-4 mr-2" />
          <span>Select Files</span>
        </button>
        
        <p className="text-sm text-gray-500">
          Supported formats: JPG, PNG, GIF (max 10MB per file)
        </p>
      </div>
    </div>
  );
}

