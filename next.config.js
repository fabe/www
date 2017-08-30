const path = require('path');
const glob = require('glob');

module.exports = {
  webpack: (config, { dev }) => {
    // npm start --preact
    if (process.env.npm_config_preact) {
      // using preact instead of minified version of react
      // to use super lightweight package
      console.log('> Using Preact instead of React');
      config.resolve.alias = {
        react: 'preact-compat/dist/preact-compat',
        'react-dom': 'preact-compat/dist/preact-compat',
      };
    }

    config.module.rules.push(
      {
        test: /\.(css|scss)/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]',
        },
      },
      {
        test: /\.css$/,
        use: [
          'babel-loader',
          'styled-modules/loader',
          'css-loader?modules',
          'postcss-loader',
        ],
      }
    );
    return config;
  },
};
