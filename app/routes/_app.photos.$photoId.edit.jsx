import React from 'react';
import { json, redirect } from '@remix-run/node';
import { useLoaderData, useActionData, Form, useNavigate, Link } from '@remix-run/react';
import { ArrowLeft } from 'lucide-react';
import TagInput from '~/components/TagInput';

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
      description: 'An adorable fluffy rabbit in the grass. This is my pet rabbit Snowball who loves to hop around the backyard. He's about 2 years old and has the softest fur.',
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

export const action = async ({ request, params }) => {
  // In a real app, this would update the photo in Supabase
  const formData = await request.formData();
  
  // Process the form data
  // ...

  // Redirect to the photo detail page
  return redirect(`/photos/${params.photoId}`);
};

export default function EditPhoto() {
  const { photo } = useLoaderData();
  const actionData = useActionData();
  const navigate = useNavigate();
  
  const [tags, setTags] = React.useState(photo.tags);

  const handleCancel = () => {
    navigate(`/photos/${photo.id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link to={`/photos/${photo.id}`} className="flex items-center text-gray-600 hover:text-primary">
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span>Back to Photo</span>
        </Link>
        
        <h1 className="text-2xl font-bold text-text">Edit Photo</h1>
      </div>
      
      <div className="bg-surface rounded-lg shadow-card overflow-hidden">
        <div className="aspect-w-16 aspect-h-9 bg-gray-100">
          <img
            src={photo.url}
            alt={photo.title}
            className="w-full object-contain max-h-[300px]"
          />
        </div>
        
        <Form method="post" className="p-6 space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={photo.title}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description / Story
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={photo.description}
              rows={5}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <TagInput
              tags={tags}
              onChange={setTags}
            />
            <input type="hidden" name="tags" value={JSON.stringify(tags)} />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90"
            >
              Save Changes
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

