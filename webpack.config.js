const path = require('path')
const webpack = require('webpack')

const config = {
  entry: './lib/ReactFauxDOM.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'ReactFauxDOM.min.js',
    library: 'ReactFauxDOM',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {test: /\.(js|jsx)$/, use: 'babel-loader'}
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin()
  ],
  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      }
    }
  ]
}

module.exports = config
