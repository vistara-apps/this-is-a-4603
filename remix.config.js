/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
  serverModuleFormat: "cjs",
  tailwind: true,
  future: {
    // These flags are now obsolete and can be removed
    // v2_errorBoundary: true,
    // v2_meta: true,
    // v2_normalizeFormMethod: true,
    // v2_routeConvention: true,
    v3_fetcherPersist: true,
    v3_lazyRouteDiscovery: true,
    v3_relativeSplatPath: true,
    v3_singleFetch: true,
    v3_throwAbortReason: true,
  },
  // Add path aliases configuration
  routes: (defineRoutes) => {
    return defineRoutes((route) => {
      // Define your routes here if needed
    });
  },
  // Configure path aliases
  serverDependenciesToBundle: [/^(?!.*\b(node_modules)\b).*$/],
  watchPaths: ["./app/**/*"],
};
