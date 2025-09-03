import React from 'react';
import { Link } from '@remix-run/react';
import { CheckCircle } from 'lucide-react';

export default function SubscriptionSuccess() {
  return (
    <div className="max-w-2xl mx-auto text-center space-y-6">
      <div className="bg-surface rounded-lg shadow-card p-8">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-text mb-4">Subscription Successful!</h1>
        
        <p className="text-gray-600 mb-6">
          Thank you for subscribing to Critter Canvas. Your account has been upgraded and you now have access to all the premium features.
        </p>
        
        <div className="space-y-4">
          <Link
            to="/dashboard"
            className="block w-full bg-primary text-white py-2 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Go to Dashboard
          </Link>
          
          <Link
            to="/upload"
            className="block w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Upload Photos
          </Link>
        </div>
      </div>
      
      <div className="bg-blue-50 rounded-lg p-6">
        <h2 className="font-semibold text-blue-800 mb-2">What's Next?</h2>
        <ul className="text-blue-700 space-y-2 text-left">
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">1.</span>
            <span>Upload your animal photos to start building your gallery</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">2.</span>
            <span>Customize your gallery layout to showcase your photos</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">3.</span>
            <span>Add descriptions and stories to your photos</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">4.</span>
            <span>Deploy your gallery to share with others</span>
          </li>
        </ul>
      </div>
      
      <p className="text-sm text-gray-500">
        A confirmation email has been sent to your email address. If you have any questions, please contact our support team.
      </p>
    </div>
  );
}

