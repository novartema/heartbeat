var webpack = require('webpack');

// Webpack plugins.
var WebpackNotifierPlugin = require('webpack-notifier');

module.exports = function(PATHS) {
  return {

    context: PATHS.root,

    debug: true,

    devtool: 'eval',

    watchOptions: {
      poll: true,
    },

    module: {
      preLoaders: [
        {
          test: /\.jsx?$/,
          loader: 'eslint',
          include: PATHS.src,
          exclude: /node_modules/,
        },
      ],
    },

    postcss: function() {
      return [
        require('stylelint'),
        require('postcss-reporter')({
          clearMessages: true,
        }),
      ];
    },

  };
};
