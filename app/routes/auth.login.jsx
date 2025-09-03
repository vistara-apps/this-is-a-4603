import React from 'react';
import { json, redirect } from '@remix-run/node';
import { Form, Link, useActionData } from '@remix-run/react';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');

  // In a real app, this would authenticate with Supabase
  // For now, just simulate a successful login
  if (email && password) {
    return redirect('/dashboard');
  }

  return json({ error: 'Invalid email or password' });
};

export default function Login() {
  const actionData = useActionData();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 bg-surface rounded-lg shadow-card">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text">Critter Canvas</h1>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        <Form method="post" className="space-y-6">
          {actionData?.error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {actionData.error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link to="/auth/reset-password" className="text-primary hover:underline">
                Forgot your password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Sign In
          </button>

          <div className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/auth/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

