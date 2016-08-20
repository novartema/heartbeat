var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

// Webpack plugins.
var HtmlPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(PATHS, NODE_ENV) {
  var dependencies = Object.keys(require(PATHS.root + '/package').dependencies);

  return {

    entry: {
      application: path.resolve(PATHS.src, 'index.js'),
      vendors: dependencies,
    },

    output: {
      path: path.resolve(PATHS.dist),
      filename: path.join('assets', '[name].[hash].js'),
      chunkFilename: '[id].[hash].js',
      publicPath: '/static/',
    },

    cache: true,

    resolve: {
      extensions: ['', '.js', '.jsx', 'css'],
      modulesDirectories: ['node_modules'],
      alias: {
        // Path aliases.
        _containers: path.resolve(PATHS.src, 'containers'),
        _components: path.resolve(PATHS.src, 'components'),
        _constants: path.resolve(PATHS.src, 'constants'),
        _reducers: path.resolve(PATHS.src, 'reducers'),
        _store: path.resolve(PATHS.src, 'store'),
        _routes: path.resolve(PATHS.src, 'routes'),
        _actions: path.resolve(PATHS.src, 'actions'),
      },

    },

    resolveLoader: {
      modulesDirectories: ['node_modules'],
      moduleTemplates: ['*-loader', '*'],
      extensions: ['', '.js', '.jsx'],
    },

    module: {
      noParse: /node_modules\/json-schema\/lib\/validate\.js/,
      loaders: [
        { test: /\.json$/, loader: 'json-loader' },
        // JSX.
        {
          test: /\.jsx?$/,
          include: PATHS.src,
          exclude: PATHS.node_modules,
          loader: 'babel',
          query: {
            presets: ['es2015', 'stage-1', 'react'],
            plugins: ['transform-decorators-legacy'],
            cacheDirectory: true,
          },
        },
        {
          loader: 'url-loader?limit=10000',
          test: /\.(gif|jpg|png|svg)$/,
        },
        {
          loader: 'url-loader?limit=1',
          test: /favicon\.ico$/,
        },
        {
          loader: 'url-loader?limit=100000',
          test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        },
        // CSS/SASS.
        {
          test: /\.s?(a|c)ss$/,
          include: PATHS.src,
          loader: ExtractTextPlugin.extract(
            'style',
            ['css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'postcss', 'sass']
          ),
        },
      ],
    },

    postcss: function() {
      return [
        // This plugin allow to use SASS syntax.
        require('precss'),
        require('autoprefixer'),
        require('postcss-focus'),
      ];
    },

    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    },

    plugins: [
      new HtmlPlugin({
        title: 'Heartbeat',
        chunks: ['application', 'vendors'],
        filename: 'index.html',
        template: path.join(PATHS.root, 'templates', 'index.html'),
      }),
      new ExtractTextPlugin(path.join('assets', '[name].[hash].css'), {
        allChunks: true,
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(NODE_ENV),
        },
      }),
    ],
  };
};
