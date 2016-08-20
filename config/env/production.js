var webpack = require('webpack');

module.exports = function(PATHS) {
  return {

    context: PATHS.root,

    debug: false,

    devtool: 'cheap-source-map',
    
  };
};
