var _ = require('lodash');
var path = require('path');

var PATHS = {
  root: path.join(__dirname),
  src: path.join(__dirname, 'src', 'app'),
  dist: path.join(__dirname, 'dist'),
  node_modules: path.join(__dirname, 'node_modules'),
  templates: path.join(__dirname, 'templates'),
};

var _configs = {
  global: require(PATHS.root + '/config/global'),
  production: require(PATHS.root + '/config/env/production'),
  development: require(PATHS.root + '/config/env/development'),
  test: require(PATHS.root + '/config/env/test')
};

var _load = function(environment) {
  // Check environment.
  if (!environment) throw 'Can\'t find local environment variable via process.env.NODE_ENV';
  if (!_configs[environment]) throw 'Can\'t find environments see _config object';
  // Load config file by environment.
  return _configs && _.merge(
    _configs['global'](PATHS, process.env.NODE_ENV),
    _configs[environment](PATHS)
  );
};

module.exports = _load(process.env.NODE_ENV);
