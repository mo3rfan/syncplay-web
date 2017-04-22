const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

const config = {
  entry: './src/syncplay.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'syncplay.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, 
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            "env": {
              "development": {
                "plugins": ["transform-flow-strip-types"],
                "presets": ['env']
              },
              "production": {
                "plugins": ["transform-flow-strip-types", "transform-remove-console"],
                "presets": ['env']
              }
            }
          }
        }
      }
    ]
  }
}

module.exports = config;
