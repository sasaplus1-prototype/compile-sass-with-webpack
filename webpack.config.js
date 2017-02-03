'use strict';

const path = require('path');

const fromPairs = require('lodash.frompairs'),
      glob = require('glob');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const { config } = require('./package');

const {
  input,
  output,
} = config;

const files = glob.sync(`${path.resolve(input)}/**/!(_)*.s[ac]ss`),
      entry = fromPairs(
        files.map(filePath => [
          filePath.replace(path.resolve(input), '').replace(/\.s[ac]ss$/, ''),
          filePath,
        ])
      );

module.exports = {

  entry,

  output: {
    path: path.resolve(output),
    filename: '[name].css',
  },

  module: {
    loaders: [
      {
        test: /\.s[ac]ss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('css!sass'),
      },
    ],
  },

  sassLoader: {
    outputStyle: 'expanded',
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
  ],

};
