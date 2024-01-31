const path = require('path');
const { createConfig } = require('@edx/frontend-build');

const config = createConfig('webpack-dev');

config.cache = { type: 'filesystem' }; // This isn't needed but really speeds up rebuilds!

config.devServer.allowedHosts = [
  'apps.local.overhang.io',
];

config.experiments = {
  topLevelAwait: true
};

config.resolve.modules = [
  path.resolve(__dirname, './node_modules'),
  path.resolve(__dirname, './src'),
  'node_modules',
];

config.module.rules[0].exclude = /node_modules\/(?!(query-string|split-on-first|strict-uri-encode|@edx))/;

module.exports = config;