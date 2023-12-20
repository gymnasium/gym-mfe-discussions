const path = require('path');
const { createConfig } = require('@edx/frontend-build');

const config = createConfig('webpack-dev-tutor');

// config.cache = { type: 'filesystem' }; // This isn't needed but really speeds up rebuilds!

config.devServer.allowedHosts = [
  'apps.local.overhang.io',
];

config.experiments = {
  topLevelAwait: true
};

config.resolve.alias =  {
  'gym-frontend-components': path.resolve(__dirname, '../gym-frontend-components/'),
};

config.resolve.modules = [
  path.resolve(__dirname, './node_modules'),
  path.resolve(__dirname, './src'),
  'node_modules',
];

module.exports = config;