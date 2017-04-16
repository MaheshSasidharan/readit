var webpack = require('webpack');

module.exports = {
 entry: [
 './src/App.js'
 ],
 output: {
   path: __dirname + '/dist',
   filename: 'bundle.js',
   publicPath: '/'
 },
 devtool: "source-map",
 module: {
   loaders: [
   { test: /\.js$/, loader: 'babel-loader', exclude: [/node_modules/]  }
   ]
 }
};