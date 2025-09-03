import React, { useState } from 'react'
import NavBar from './components/NavBar'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import Gallery from './components/Gallery'
import Upload from './components/Upload'

function App() {
  const [currentView, setCurrentView] = useState('dashboard')
  const [photos, setPhotos] = useState([
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
  ])
  const [galleryLayout, setGalleryLayout] = useState('grid')

  const addPhoto = (newPhoto) => {
    setPhotos(prev => [...prev, { ...newPhoto, id: Date.now() }])
  }

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard photos={photos} />
      case 'gallery':
        return <Gallery photos={photos} layout={galleryLayout} setLayout={setGalleryLayout} />
      case 'upload':
        return <Upload onPhotoAdd={addPhoto} />
      default:
        return <Dashboard photos={photos} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <div className="flex">
        <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

export default App