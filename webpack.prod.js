const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!')
}

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new webpack.HashedModuleIdsPlugin()
  ]
})
