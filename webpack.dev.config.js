const path = require('path');
const { createConfig } = require('@edx/frontend-build');

const config = createConfig('webpack-dev');

config.devServer.allowedHosts = [
  'apps.local.overhang.io',
  'local.overhang.io',
  'overhang.io',
  'apps.local.edly.io',
  'local.edly.io',
  'edly.io',
];

config.experiments = {
  topLevelAwait: true
};

// config.resolve.modules = [
//   path.resolve(__dirname, './node_modules'),
//   path.resolve(__dirname, './src'),
//   'node_modules',
// ];

module.exports = config;
