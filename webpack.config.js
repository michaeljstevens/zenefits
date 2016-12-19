var path = require("path");
var AnyBarWebpackPlugin = require('anybar-webpack');

module.exports = {
  context: __dirname,
  entry: "./js/entry.jsx",
  output: {
    path: path.join(__dirname, 'js'),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  devtool: 'source-maps',
  resolve: {
    extensions: ["", ".js", ".jsx" ]
  },
  plugins: [
    new AnyBarWebpackPlugin({
      enableNotifications: true
    })
  ]
};
