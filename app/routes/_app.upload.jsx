import React, { useState } from 'react';
import { redirect } from '@remix-run/node';
import { Form, useActionData, useNavigate } from '@remix-run/react';
import { Upload as UploadIcon, X, Tag, FileImage } from 'lucide-react';
import FileUpload from '~/components/FileUpload';
import TagInput from '~/components/TagInput';

export const action = async ({ request }) => {
  // In a real app, this would upload to Pinata and store metadata in Supabase
  const formData = await request.formData();
  
  // Process the form data
  // ...

  // Redirect to the gallery after successful upload
  return redirect('/gallery');
};

export default function Upload() {
  const actionData = useActionData();
  const navigate = useNavigate();
  
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);

  const handleFilesSelected = (files) => {
    const fileArray = Array.from(files).map((file, index) => ({
      id: Date.now() + index,
      file,
      preview: URL.createObjectURL(file),
      title: file.name.split('.')[0],
      description: '',
      tags: []
    }));
    setSelectedFiles(fileArray);
    setCurrentFileIndex(0);
  };

  const updateCurrentFile = (field, value) => {
    setSelectedFiles(prev => prev.map((file, index) => 
      index === currentFileIndex ? { ...file, [field]: value } : file
    ));
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    if (currentFileIndex >= selectedFiles.length - 1) {
      setCurrentFileIndex(Math.max(0, selectedFiles.length - 2));
    }
  };

  const generateAutoTags = async () => {
    // In a real app, this would call the OpenAI API
    // Simulate AI tagging for now
    const commonTags = ['animal', 'pet', 'cute', 'nature', 'photography'];
    const randomTags = commonTags.slice(0, Math.floor(Math.random() * 3) + 2);
    updateCurrentFile('tags', randomTags);
  };

  const handleUpload = () => {
    // In a real app, this would submit the form with the file data
    // For now, simulate a successful upload
    navigate('/gallery');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-text">Upload Photos</h2>

      {selectedFiles.length === 0 ? (
        <FileUpload onFilesSelected={handleFilesSelected} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* File List */}
          <div className="bg-surface rounded-lg shadow-card p-4">
            <h3 className="font-semibold mb-4">Uploaded Files ({selectedFiles.length})</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {selectedFiles.map((file, index) => (
                <div
                  key={file.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    index === currentFileIndex ? 'bg-primary/10 border border-primary' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  onClick={() => setCurrentFileIndex(index)}
                >
                  <img src={file.preview} alt={file.title} className="w-12 h-12 object-cover rounded" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.title}</p>
                    <p className="text-xs text-gray-500">{file.file.size} bytes</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(index);
                    }}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Preview & Edit */}
          <div className="lg:col-span-2 bg-surface rounded-lg shadow-card p-6">
            {selectedFiles[currentFileIndex] && (
              <div className="space-y-4">
                <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={selectedFiles[currentFileIndex].preview}
                    alt={selectedFiles[currentFileIndex].title}
                    className="w-full h-64 object-cover"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={selectedFiles[currentFileIndex].title}
                      onChange={(e) => updateCurrentFile('title', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={selectedFiles[currentFileIndex].description}
                      onChange={(e) => updateCurrentFile('description', e.target.value)}
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      placeholder="Tell the story behind this photo..."
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">Tags</label>
                      <button
                        onClick={generateAutoTags}
                        className="text-sm text-primary hover:underline"
                        type="button"
                      >
                        Generate Auto Tags
                      </button>
                    </div>
                    <TagInput
                      tags={selectedFiles[currentFileIndex].tags}
                      onChange={(tags) => updateCurrentFile('tags', tags)}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setSelectedFiles([])}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
                type="button"
              >
                Upload All Photos
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

