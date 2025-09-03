import React, { useState } from 'react';
import { json, redirect } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import { Globe, Server, ArrowRight, Check } from 'lucide-react';

export const action = async ({ request }) => {
  // In a real app, this would trigger a deployment to Vercel or Netlify
  const formData = await request.formData();
  const platform = formData.get('platform');
  const domain = formData.get('domain');
  
  // Simulate a deployment
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return json({ success: true, platform, domain });
};

export default function Deploy() {
  const actionData = useActionData();
  const [selectedPlatform, setSelectedPlatform] = useState('vercel');
  
  const platforms = [
    { id: 'vercel', name: 'Vercel', logo: '▲', color: 'bg-black' },
    { id: 'netlify', name: 'Netlify', logo: '◆', color: 'bg-blue-600' },
  ];
  
  if (actionData?.success) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <div className="bg-surface rounded-lg shadow-card p-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="w-10 h-10 text-green-500" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-text mb-4">Deployment Successful!</h1>
          
          <p className="text-gray-600 mb-6">
            Your Critter Canvas gallery has been successfully deployed to {actionData.platform}.
            {actionData.domain && (
              <> You can now access it at <a href={`https://${actionData.domain}`} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">{actionData.domain}</a>.</>
            )}
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h2 className="font-semibold mb-2">Deployment Details</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-left">
                <p className="text-gray-600">Platform</p>
                <p className="font-medium">{actionData.platform}</p>
              </div>
              <div className="text-left">
                <p className="text-gray-600">Domain</p>
                <p className="font-medium">{actionData.domain || 'Default platform domain'}</p>
              </div>
              <div className="text-left">
                <p className="text-gray-600">Deployment Time</p>
                <p className="font-medium">Just now</p>
              </div>
              <div className="text-left">
                <p className="text-gray-600">Status</p>
                <p className="font-medium text-green-600">Live</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <a
              href={`https://${actionData.domain || 'your-gallery.vercel.app'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-primary text-white py-2 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Visit Your Gallery
            </a>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-text">Deploy Your Gallery</h2>
      <p className="text-gray-600">
        Deploy your Critter Canvas gallery to the web with just one click. Choose your preferred platform and customize your domain.
      </p>
      
      <div className="bg-surface rounded-lg shadow-card p-6">
        <Form method="post" className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Deployment Platform
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {platforms.map((platform) => (
                <label
                  key={platform.id}
                  className={`border rounded-lg p-4 flex items-center cursor-pointer transition-colors ${
                    selectedPlatform === platform.id
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="platform"
                    value={platform.id}
                    checked={selectedPlatform === platform.id}
                    onChange={() => setSelectedPlatform(platform.id)}
                    className="sr-only"
                  />
                  <div className={`w-10 h-10 ${platform.color} text-white rounded flex items-center justify-center mr-3`}>
                    <span className="text-lg font-bold">{platform.logo}</span>
                  </div>
                  <div>
                    <p className="font-medium">{platform.name}</p>
                    <p className="text-sm text-gray-600">Fast and reliable hosting</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label htmlFor="domain" className="block text-sm font-medium text-gray-700 mb-2">
              Custom Domain (Optional)
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="domain"
                name="domain"
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="your-gallery.com"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Leave blank to use the default {selectedPlatform} subdomain.
            </p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 flex items-center mb-2">
              <Server className="w-4 h-4 mr-2" />
              Deployment Preview
            </h3>
            <p className="text-sm text-blue-700 mb-3">
              Your gallery will be deployed with the following configuration:
            </p>
            <div className="bg-white p-3 rounded border border-blue-100 text-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Platform:</span>
                <span className="font-medium">{platforms.find(p => p.id === selectedPlatform)?.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Domain:</span>
                <span className="font-medium">
                  {selectedPlatform === 'vercel' ? 'your-gallery.vercel.app' : 'your-gallery.netlify.app'}
                </span>
              </div>
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center"
          >
            Deploy Now
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </Form>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold mb-3">Why Deploy with Critter Canvas?</h3>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="text-primary mr-2">✓</span>
            <span>One-click deployment to popular hosting platforms</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">✓</span>
            <span>Automatic SSL certificate for secure browsing</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">✓</span>
            <span>Global CDN for fast loading times</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">✓</span>
            <span>Custom domain support</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

