const path = require('path');
const TerserPlugin = require('terser-webpack-plugin')


/** @type {import('webpack').Configuration} */
module.exports = {
  mode: 'none',
  entry: {
    'are-you-late': './src/index',
    'are-you-late.min': './src/index',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    // 全局名字
    library: 'Late',
    globalObject: "this",
    clean: true
  },
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
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      "@": path.join(__dirname, "src")
    },
    fallback: {
      "path": require.resolve("path-browserify")
    }
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
