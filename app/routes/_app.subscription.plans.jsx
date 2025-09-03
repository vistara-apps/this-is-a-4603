import React from 'react';
import { json } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';
import { Check } from 'lucide-react';

export const loader = async () => {
  // In a real app, this would fetch plans from Stripe
  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '$5',
      period: 'month',
      features: [
        'Up to 100 photos',
        'Basic gallery layouts',
        'Standard photo quality',
        'Email support'
      ],
      recommended: false,
      buttonText: 'Get Started'
    },
    {
      id: 'pro',
      name: 'Professional',
      price: '$15',
      period: 'month',
      features: [
        'Unlimited photos',
        'All gallery layouts',
        'High-quality photo storage',
        'Advanced customization',
        'Priority support',
        'Custom domain'
      ],
      recommended: true,
      buttonText: 'Try Pro'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      features: [
        'Unlimited photos',
        'All gallery layouts',
        'Ultra-high-quality photo storage',
        'Advanced customization',
        'Dedicated support',
        'Custom domain',
        'API access',
        'White labeling'
      ],
      recommended: false,
      buttonText: 'Contact Us'
    }
  ];

  return json({ plans });
};

export default function SubscriptionPlans() {
  const { plans } = useLoaderData();

  return (
    <div className="space-y-6">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-text">Choose Your Plan</h2>
        <p className="text-gray-600 mt-2">
          Select the perfect plan for your needs and start showcasing your animal photos today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {plans.map((plan) => (
          <div 
            key={plan.id}
            className={`bg-surface rounded-lg shadow-card overflow-hidden border ${
              plan.recommended ? 'border-primary' : 'border-transparent'
            }`}
          >
            {plan.recommended && (
              <div className="bg-primary text-white text-center py-2 text-sm font-medium">
                Recommended
              </div>
            )}
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-text">{plan.name}</h3>
              
              <div className="mt-4 mb-6">
                <span className="text-4xl font-bold text-text">{plan.price}</span>
                {plan.period && (
                  <span className="text-gray-600 ml-1">/{plan.period}</span>
                )}
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link
                to={`/subscription/checkout?plan=${plan.id}`}
                className={`block w-full py-2 px-4 rounded-lg text-center font-medium ${
                  plan.recommended
                    ? 'bg-primary text-white hover:opacity-90'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {plan.buttonText}
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-gray-50 rounded-lg p-6 mt-8 text-center">
        <h3 className="text-lg font-semibold mb-2">Need help choosing?</h3>
        <p className="text-gray-600 mb-4">
          Contact our team for a personalized recommendation based on your specific needs.
        </p>
        <Link
          to="/contact"
          className="inline-block bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-300"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
}

