const dev = process.env.NODE_ENV !== 'production';

const config = {
  app: {
    name: 'App',
    publicUrl: 'https://app.com',
  },
  server: dev ? 'http://localhost:1337' : 'https://appspot.com',
};

export default config;
