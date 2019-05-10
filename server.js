const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')

const app = express()
const config = require('./webpack.common')
const complier = webpack(config)

app.use(webpackDevMiddleware(complier, {
  publicPath: config.output.publicPath
}))

app.use(require('webpack-hot-middleware')(complier))

app.listen(3000, function() {
  console.log('Example app listening on port 3000!\n')
})
