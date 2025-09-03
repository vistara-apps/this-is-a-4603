import React from 'react';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData, useSearchParams, Link } from '@remix-run/react';
import { ArrowLeft, CreditCard, Lock } from 'lucide-react';

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const planId = url.searchParams.get('plan');
  
  // In a real app, this would fetch plan details from Stripe
  const plans = {
    basic: {
      id: 'basic',
      name: 'Basic',
      price: '$5',
      period: 'month',
      features: [
        'Up to 100 photos',
        'Basic gallery layouts',
        'Standard photo quality',
        'Email support'
      ]
    },
    pro: {
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
      ]
    },
    enterprise: {
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
      ]
    }
  };
  
  if (!planId || !plans[planId]) {
    return redirect('/subscription/plans');
  }
  
  return json({ plan: plans[planId] });
};

export const action = async ({ request }) => {
  // In a real app, this would create a Stripe checkout session
  // For now, just simulate a successful checkout
  return redirect('/subscription/success');
};

export default function Checkout() {
  const { plan } = useLoaderData();
  const [searchParams] = useSearchParams();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/subscription/plans" className="flex items-center text-gray-600 hover:text-primary">
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span>Back to Plans</span>
        </Link>
        
        <h1 className="text-2xl font-bold text-text">Checkout</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-surface rounded-lg shadow-card p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
            
            <Form method="post" className="space-y-4">
              <input type="hidden" name="planId" value={plan.id} />
              
              <div>
                <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-2">
                  Name on Card
                </label>
                <input
                  id="cardName"
                  name="cardName"
                  type="text"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    id="cardNumber"
                    name="cardNumber"
                    type="text"
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="4242 4242 4242 4242"
                  />
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <input
                    id="expiry"
                    name="expiry"
                    type="text"
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="MM/YY"
                  />
                </div>
                
                <div>
                  <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-2">
                    CVC
                  </label>
                  <input
                    id="cvc"
                    name="cvc"
                    type="text"
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="123"
                  />
                </div>
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Pay {plan.price}{plan.period ? `/${plan.period}` : ''}
                </button>
              </div>
              
              <p className="text-xs text-gray-500 text-center mt-2">
                Your payment is secured with SSL encryption. We never store your full card details.
              </p>
            </Form>
          </div>
        </div>
        
        <div>
          <div className="bg-surface rounded-lg shadow-card p-6 sticky top-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            
            <div className="border-b border-gray-200 pb-4 mb-4">
              <div className="flex justify-between mb-2">
                <span className="font-medium">{plan.name} Plan</span>
                <span>{plan.price}</span>
              </div>
              <p className="text-sm text-gray-600">
                Billed {plan.period ? `per ${plan.period}` : 'as agreed'}
              </p>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between font-medium">
                <span>Subtotal</span>
                <span>{plan.price}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>$0.00</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{plan.price}</span>
              </div>
            </div>
            
            <div className="mt-6 space-y-2">
              <h3 className="font-medium">Plan Includes:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

