// Stripe service for subscription management
// This service handles creating and managing subscriptions with Stripe

import Stripe from 'stripe';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
const APP_URL = process.env.APP_URL || 'http://localhost:3000';

if (!STRIPE_SECRET_KEY) {
  console.warn('Stripe API key not found. Using mock data instead.');
}

// Initialize Stripe client
const stripe = STRIPE_SECRET_KEY ? new Stripe(STRIPE_SECRET_KEY) : null;

// Define subscription plans
export const SUBSCRIPTION_PLANS = {
  basic: {
    id: 'basic',
    name: 'Basic',
    price: '$5',
    period: 'month',
    stripePriceId: process.env.STRIPE_BASIC_PRICE_ID || 'price_mock_basic',
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
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID || 'price_mock_pro',
    features: [
      'Unlimited photos',
      'All gallery layouts',
      'High-quality photo storage',
      'Advanced customization',
      'Priority support',
      'Custom domain'
    ]
  }
};

/**
 * Create a Stripe checkout session for subscription
 * @param {string} planId - ID of the subscription plan
 * @param {string} userId - User ID
 * @param {string} email - User email
 * @returns {Promise<Object>} - Checkout session
 */
export async function createCheckoutSession(planId, userId, email) {
  if (!stripe) {
    // Mock response for development
    console.log('Using mock Stripe checkout session');
    return {
      id: `mock-session-${Date.now()}`,
      url: `${APP_URL}/subscription/success?session_id=mock-session-${Date.now()}`
    };
  }

  const plan = SUBSCRIPTION_PLANS[planId];
  if (!plan) {
    throw new Error(`Invalid plan ID: ${planId}`);
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: plan.stripePriceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${APP_URL}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${APP_URL}/subscription/plans`,
      customer_email: email,
      client_reference_id: userId,
      metadata: {
        userId,
        planId
      }
    });

    return session;
  } catch (error) {
    console.error('Error creating Stripe checkout session:', error);
    throw error;
  }
}

/**
 * Get subscription details from Stripe
 * @param {string} subscriptionId - Stripe subscription ID
 * @returns {Promise<Object>} - Subscription details
 */
export async function getSubscription(subscriptionId) {
  if (!stripe) {
    // Mock response for development
    return {
      id: subscriptionId || `mock-subscription-${Date.now()}`,
      status: 'active',
      current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).getTime() / 1000,
      items: {
        data: [
          {
            price: {
              id: SUBSCRIPTION_PLANS.basic.stripePriceId
            }
          }
        ]
      }
    };
  }

  try {
    return await stripe.subscriptions.retrieve(subscriptionId);
  } catch (error) {
    console.error('Error retrieving Stripe subscription:', error);
    throw error;
  }
}

/**
 * Cancel a subscription in Stripe
 * @param {string} subscriptionId - Stripe subscription ID
 * @returns {Promise<Object>} - Canceled subscription
 */
export async function cancelSubscription(subscriptionId) {
  if (!stripe) {
    // Mock response for development
    return {
      id: subscriptionId,
      status: 'canceled'
    };
  }

  try {
    return await stripe.subscriptions.cancel(subscriptionId);
  } catch (error) {
    console.error('Error canceling Stripe subscription:', error);
    throw error;
  }
}

/**
 * Create a customer portal session for managing subscription
 * @param {string} customerId - Stripe customer ID
 * @returns {Promise<Object>} - Customer portal session
 */
export async function createCustomerPortalSession(customerId) {
  if (!stripe) {
    // Mock response for development
    return {
      url: `${APP_URL}/subscription/manage?mock=true`
    };
  }

  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${APP_URL}/dashboard`,
    });

    return session;
  } catch (error) {
    console.error('Error creating Stripe customer portal session:', error);
    throw error;
  }
}

/**
 * Handle Stripe webhook events
 * @param {string} payload - Raw request body
 * @param {string} signature - Stripe signature header
 * @returns {Promise<Object>} - Processed event
 */
export async function handleWebhookEvent(payload, signature) {
  if (!stripe || !STRIPE_WEBHOOK_SECRET) {
    // Mock event for development
    return {
      type: 'mock.event',
      data: {
        object: {
          id: `mock-${Date.now()}`,
          customer: `mock-customer-${Date.now()}`,
          subscription: `mock-subscription-${Date.now()}`
        }
      }
    };
  }

  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      STRIPE_WEBHOOK_SECRET
    );

    return event;
  } catch (error) {
    console.error('Error verifying Stripe webhook:', error);
    throw error;
  }
}

