module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
  plugins: [
    // Transform import.meta to process.env for Jest compatibility
    function () {
      return {
        visitor: {
          MetaProperty(path) {
            if (path.node.meta.name === 'import' && path.node.property.name === 'meta') {
              // Replace import.meta with a mock object
              path.replaceWithSourceString(`{
                env: {
                  VITE_FIREBASE_API_KEY: process.env.VITE_FIREBASE_API_KEY || 'test-api-key',
                  VITE_FIREBASE_AUTH_DOMAIN: process.env.VITE_FIREBASE_AUTH_DOMAIN || 'test-auth-domain',
                  VITE_FIREBASE_PROJECT_ID: process.env.VITE_FIREBASE_PROJECT_ID || 'test-project-id',
                  VITE_FIREBASE_STORAGE_BUCKET: process.env.VITE_FIREBASE_STORAGE_BUCKET || 'test-storage-bucket',
                  VITE_FIREBASE_MESSAGING_SENDER_ID: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'test-sender-id',
                  VITE_FIREBASE_APP_ID: process.env.VITE_FIREBASE_APP_ID || 'test-app-id',
                  VITE_FIREBASE_MEASUREMENT_ID: process.env.VITE_FIREBASE_MEASUREMENT_ID || 'test-measurement-id',
                  VITE_TMDB_API_KEY: process.env.VITE_TMDB_API_KEY || 'test-tmdb-api-key',
                }
              }`);
            }
          },
        },
      };
    },
  ],
};

