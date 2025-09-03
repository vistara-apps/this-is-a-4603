import React, { useRef } from 'react'
import { Upload, FileImage } from 'lucide-react'

const FileUpload = ({ onFilesSelected, variant = 'dragDrop' }) => {
  const fileInputRef = useRef(null)

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'))
    if (files.length > 0) {
      onFilesSelected(files)
    }
  }

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      onFilesSelected(files)
    }
  }

  if (variant === 'button') {
    return (
      <div>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center space-x-2"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Photos</span>
        </button>
      </div>
    )
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer"
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <div className="space-y-4">
        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
          <FileImage className="w-8 h-8 text-gray-400" />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Animal Photos</h3>
          <p className="text-gray-600 mb-4">Drag and drop your photos here, or click to browse</p>
          <button className="bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">
            Choose Files
          </button>
        </div>
        
        <p className="text-sm text-gray-500">Supports: JPG, PNG, GIF (max 10MB each)</p>
      </div>
    </div>
  )
}

export default FileUpload