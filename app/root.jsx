import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import { cssBundleHref } from "@remix-run/css-bundle";
import styles from "./tailwind.css";

export const links = () => [
  { rel: "stylesheet", href: styles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "icon", href: "/favicon.ico" },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  
  let errorMessage = "An unexpected error occurred";
  let errorStatus = 500;
  
  if (isRouteErrorResponse(error)) {
    errorMessage = error.data || error.statusText;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }
  
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <title>Error - Critter Canvas</title>
      </head>
      <body>
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="bg-surface rounded-lg shadow-card p-8 max-w-md w-full">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              {errorStatus}: {errorStatus === 404 ? "Page Not Found" : "Error"}
            </h1>
            <p className="text-gray-700 mb-6">{errorMessage}</p>
            <a
              href="/"
              className="block w-full bg-primary text-white py-2 px-4 rounded-lg text-center font-medium hover:opacity-90 transition-opacity"
            >
              Return to Home
            </a>
          </div>
        </div>
        <Scripts />
      </body>
    </html>
  );
}

