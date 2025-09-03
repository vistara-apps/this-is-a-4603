import { redirect } from '@remix-run/node';

export const loader = async () => {
  // Redirect to dashboard by default
  return redirect('/dashboard');
};

export default function Index() {
  return null;
}

