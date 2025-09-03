import React from 'react';
import { Link } from '@remix-run/react';

export default function ApiDocs() {
  const apiEndpoints = [
    {
      name: 'Authentication',
      endpoints: [
        {
          method: 'POST',
          path: '/auth/login',
          description: 'Authenticate a user and get a JWT token',
          parameters: [
            { name: 'email', type: 'string', required: true, description: 'User email' },
            { name: 'password', type: 'string', required: true, description: 'User password' }
          ],
          response: {
            success: {
              code: 200,
              body: {
                token: 'JWT_TOKEN',
                user: { id: 'user_id', email: 'user@example.com' }
              }
            },
            error: {
              code: 401,
              body: { error: 'Invalid credentials' }
            }
          }
        },
        {
          method: 'POST',
          path: '/auth/signup',
          description: 'Create a new user account',
          parameters: [
            { name: 'email', type: 'string', required: true, description: 'User email' },
            { name: 'password', type: 'string', required: true, description: 'User password' },
            { name: 'name', type: 'string', required: false, description: 'User name' }
          ],
          response: {
            success: {
              code: 201,
              body: {
                token: 'JWT_TOKEN',
                user: { id: 'user_id', email: 'user@example.com' }
              }
            },
            error: {
              code: 400,
              body: { error: 'Email already in use' }
            }
          }
        }
      ]
    },
    {
      name: 'Photos',
      endpoints: [
        {
          method: 'GET',
          path: '/api/photos',
          description: 'Get all photos for the authenticated user',
          parameters: [
            { name: 'limit', type: 'number', required: false, description: 'Number of photos to return (default: 20)' },
            { name: 'offset', type: 'number', required: false, description: 'Offset for pagination (default: 0)' },
            { name: 'tag', type: 'string', required: false, description: 'Filter photos by tag' }
          ],
          response: {
            success: {
              code: 200,
              body: {
                photos: [
                  {
                    id: 'photo_id',
                    url: 'https://example.com/photo.jpg',
                    title: 'Photo Title',
                    description: 'Photo Description',
                    tags: ['tag1', 'tag2'],
                    uploadDate: '2024-01-15'
                  }
                ],
                total: 100
              }
            },
            error: {
              code: 401,
              body: { error: 'Unauthorized' }
            }
          }
        },
        {
          method: 'POST',
          path: '/api/photos',
          description: 'Upload a new photo',
          parameters: [
            { name: 'file', type: 'file', required: true, description: 'Photo file (JPG, PNG, GIF)' },
            { name: 'title', type: 'string', required: true, description: 'Photo title' },
            { name: 'description', type: 'string', required: false, description: 'Photo description' },
            { name: 'tags', type: 'array', required: false, description: 'Array of tags' }
          ],
          response: {
            success: {
              code: 201,
              body: {
                id: 'photo_id',
                url: 'https://example.com/photo.jpg',
                title: 'Photo Title',
                description: 'Photo Description',
                tags: ['tag1', 'tag2'],
                uploadDate: '2024-01-15'
              }
            },
            error: {
              code: 400,
              body: { error: 'Invalid file format' }
            }
          }
        },
        {
          method: 'GET',
          path: '/api/photos/:id',
          description: 'Get a specific photo by ID',
          parameters: [
            { name: 'id', type: 'string', required: true, description: 'Photo ID' }
          ],
          response: {
            success: {
              code: 200,
              body: {
                id: 'photo_id',
                url: 'https://example.com/photo.jpg',
                title: 'Photo Title',
                description: 'Photo Description',
                tags: ['tag1', 'tag2'],
                uploadDate: '2024-01-15'
              }
            },
            error: {
              code: 404,
              body: { error: 'Photo not found' }
            }
          }
        },
        {
          method: 'PUT',
          path: '/api/photos/:id',
          description: 'Update a photo',
          parameters: [
            { name: 'id', type: 'string', required: true, description: 'Photo ID' },
            { name: 'title', type: 'string', required: false, description: 'Photo title' },
            { name: 'description', type: 'string', required: false, description: 'Photo description' },
            { name: 'tags', type: 'array', required: false, description: 'Array of tags' }
          ],
          response: {
            success: {
              code: 200,
              body: {
                id: 'photo_id',
                url: 'https://example.com/photo.jpg',
                title: 'Updated Title',
                description: 'Updated Description',
                tags: ['tag1', 'tag2', 'tag3'],
                uploadDate: '2024-01-15'
              }
            },
            error: {
              code: 404,
              body: { error: 'Photo not found' }
            }
          }
        },
        {
          method: 'DELETE',
          path: '/api/photos/:id',
          description: 'Delete a photo',
          parameters: [
            { name: 'id', type: 'string', required: true, description: 'Photo ID' }
          ],
          response: {
            success: {
              code: 204,
              body: null
            },
            error: {
              code: 404,
              body: { error: 'Photo not found' }
            }
          }
        }
      ]
    },
    {
      name: 'Gallery Settings',
      endpoints: [
        {
          method: 'GET',
          path: '/api/gallery',
          description: 'Get gallery settings for the authenticated user',
          parameters: [],
          response: {
            success: {
              code: 200,
              body: {
                layoutType: 'grid',
                customizationOptions: {
                  theme: 'light',
                  primaryColor: '#3B82F6',
                  showTitles: true,
                  showDescriptions: true,
                  showTags: true
                }
              }
            },
            error: {
              code: 401,
              body: { error: 'Unauthorized' }
            }
          }
        },
        {
          method: 'PUT',
          path: '/api/gallery',
          description: 'Update gallery settings',
          parameters: [
            { name: 'layoutType', type: 'string', required: false, description: 'Layout type (grid, masonry, carousel)' },
            { name: 'customizationOptions', type: 'object', required: false, description: 'Customization options' }
          ],
          response: {
            success: {
              code: 200,
              body: {
                layoutType: 'masonry',
                customizationOptions: {
                  theme: 'dark',
                  primaryColor: '#3B82F6',
                  showTitles: true,
                  showDescriptions: false,
                  showTags: true
                }
              }
            },
            error: {
              code: 400,
              body: { error: 'Invalid layout type' }
            }
          }
        }
      ]
    },
    {
      name: 'Deployment',
      endpoints: [
        {
          method: 'POST',
          path: '/api/deploy',
          description: 'Deploy the gallery to a hosting platform',
          parameters: [
            { name: 'platform', type: 'string', required: true, description: 'Hosting platform (vercel, netlify)' },
            { name: 'domain', type: 'string', required: false, description: 'Custom domain' }
          ],
          response: {
            success: {
              code: 200,
              body: {
                deploymentId: 'deployment_id',
                platform: 'vercel',
                domain: 'your-gallery.vercel.app',
                status: 'success'
              }
            },
            error: {
              code: 400,
              body: { error: 'Invalid platform' }
            }
          }
        },
        {
          method: 'GET',
          path: '/api/deploy/:id',
          description: 'Get deployment status',
          parameters: [
            { name: 'id', type: 'string', required: true, description: 'Deployment ID' }
          ],
          response: {
            success: {
              code: 200,
              body: {
                deploymentId: 'deployment_id',
                platform: 'vercel',
                domain: 'your-gallery.vercel.app',
                status: 'success',
                createdAt: '2024-01-15T12:00:00Z',
                completedAt: '2024-01-15T12:01:30Z'
              }
            },
            error: {
              code: 404,
              body: { error: 'Deployment not found' }
            }
          }
        }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-text">API Documentation</h2>
        <p className="text-gray-600 mt-2">
          Complete reference for the Critter Canvas API. Use these endpoints to interact with your gallery programmatically.
        </p>
      </div>

      <div className="bg-surface rounded-lg shadow-card p-6">
        <h3 className="text-xl font-semibold mb-4">Authentication</h3>
        <p className="mb-4">
          All API requests (except authentication endpoints) require a valid JWT token in the Authorization header:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          Authorization: Bearer &lt;your_jwt_token&gt;
        </div>
      </div>

      <div className="space-y-6">
        {apiEndpoints.map((section, sectionIndex) => (
          <div key={sectionIndex} className="bg-surface rounded-lg shadow-card overflow-hidden">
            <div className="bg-gray-50 p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">{section.name}</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {section.endpoints.map((endpoint, endpointIndex) => (
                <div key={endpointIndex} className="p-6">
                  <div className="flex items-center mb-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold text-white ${
                      endpoint.method === 'GET' ? 'bg-green-500' :
                      endpoint.method === 'POST' ? 'bg-blue-500' :
                      endpoint.method === 'PUT' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}>
                      {endpoint.method}
                    </span>
                    <code className="ml-2 font-mono text-sm">{endpoint.path}</code>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{endpoint.description}</p>
                  
                  {endpoint.parameters.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Parameters</h4>
                      <div className="bg-gray-50 rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {endpoint.parameters.map((param, paramIndex) => (
                              <tr key={paramIndex}>
                                <td className="px-4 py-2 text-sm font-mono">{param.name}</td>
                                <td className="px-4 py-2 text-sm">{param.type}</td>
                                <td className="px-4 py-2 text-sm">{param.required ? 'Yes' : 'No'}</td>
                                <td className="px-4 py-2 text-sm">{param.description}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <h4 className="font-semibold mb-2">Response</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-sm font-medium text-green-600 mb-1">Success ({endpoint.response.success.code})</h5>
                        <pre className="bg-gray-50 p-3 rounded-lg text-xs overflow-x-auto">
                          {JSON.stringify(endpoint.response.success.body, null, 2)}
                        </pre>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-red-600 mb-1">Error ({endpoint.response.error.code})</h5>
                        <pre className="bg-gray-50 p-3 rounded-lg text-xs overflow-x-auto">
                          {JSON.stringify(endpoint.response.error.body, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="font-semibold text-blue-800 mb-2">Need Help?</h3>
        <p className="text-blue-700 mb-4">
          If you have any questions or need assistance with the API, please contact our support team.
        </p>
        <Link
          to="/contact"
          className="inline-block bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
}

