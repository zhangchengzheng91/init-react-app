const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const webpackManifestPlugin = require('webpack-manifest-plugin')
const webpack = require('webpack')

module.exports = {
  entry: {
    polyfills: './src/polyfills',
    main: './src/index.js',
    //main: './src/index.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/',
    pathinfo: false
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    runtimeChunk: 'single'
  },
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: 'raw-loader'
      }, {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }, {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }, {
        test: /\.(png|svg|jpg|gif)$/,
        use: 'file-loader'
      }, {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }, {
        test: /\.xml$/,
        use: 'xml-loader'
      }, {
        test: /\.js$/,
        use: 'babel-loader'
      }, {
        test: require.resolve('./src/globals.js'),
        use: 'exports-loader?file,parse=helpers.parse'
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      //title: '开发环境',
      template: './src/index.html'
    }),
    new webpackManifestPlugin(),
    new cleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.ProvidePlugin({
      'join': 'loadsh'
    })
  ]
}
