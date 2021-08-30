const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

const webpack = require('webpack')
let externals = _externals()

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: {
    'are-you-late': path.join(__dirname, 'src', 'index.ts'),
    'are-you-late.min': path.join(__dirname, 'src', 'index.ts'),
  },
  mode: 'production',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.join(__dirname, 'src')
    },
  },
  // 重要
  // node项目 不用全都打包 全部外部依赖
  externals: externals,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                declaration: false
              }
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/
      })
    ]
  }
}

function _externals() {
  let manifest = require('./package.json')
  let dependencies = manifest.dependencies
  let externals = {}
  for (let p in dependencies) {
    externals[p] = 'commonjs ' + p
  }
  return externals
}
