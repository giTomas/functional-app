const ProvidePlugin = require("webpack/lib/ProvidePlugin");
const DefinePlugin = require("webpack/lib/DefinePlugin");
const path = require("path");
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const DIST = path.resolve(__dirname, 'dist');

const config = {
  // context: path
  entry: {
    // vendor: [
    //   "react",
    //   "react-dom",
    //   "typeface-istok-web",
    //   "es6-promise",
    //   "whatwg-fetch",
    //   "react-router-dom",
    //   "styled-components",
    //   // "rambda",
    // ],
    main: path.resolve(__dirname, 'index.js'),
  },
  output: {
    path: DIST,
    publicPath:"/",
    filename: "[name].bundle.js",
    // chunkFilename: '[name]-[chunkhash].js'
  },

  devServer: {
    historyApiFallback: true,
    contentBase: DIST,
    port: 8080
  },
  devtool: "source-map",
  module: {
    rules: [
        {
          test: /\.jsx?$/,
          enforce: "pre",
          exclude: [/node_modules/],
          use: [{
            loader: "eslint-loader?parser=babel-eslint",
            options: {
              emitWarning: true,
              configfile: path.resolve(__dirname, ".eslintrc")
          }
          }]
        },
        {
          test:/\.jsx?$/,
          exclude: [/node_modules/],
          use: [{
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              presets: [
                        ["es2015", {"modules": false}],
                        "react",
                        "stage-0",
                        "stage-1",
                        "stage-3"
                        ],
              plugins: ["transform-decorators-legacy"]
              }
            }],
        },
        {
          test: /\.css$/,
          use: [
                "style-loader",
                "css-loader"
               ],
        },
        {
          test: /\.woff2?$/,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 50000,
              mimetype: 'application/font-woff',

            },
          },
        ],
      },
      {
        test: /\.(ttf|svg|eot)$/,
        loader: 'file-loader',
        options: {
          name: './fonts/[hash].[ext]',
        }
      },
    ],
  },
  resolve: {
    extensions: [".css", ".js", ".jsx", ".json"],
    alias: {
      // Helpers: path.resolve(__dirname, 'app/helpers/'),
      // Styles: path.resolve(__dirname, 'app/styles/'),
    },
  },
  plugins: [
    new ProvidePlugin({
      Promise: "imports-loader?this=>global!exports-loader?global.Promise!es6-promise",
      fetch: "imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch",
  }),
    new CommonsChunkPlugin({
      name: "vendor",
      filename: "vendor.bundle.js",
      minChunks: ({ resource }) => /node_modules/.test(resource),
  }),
    // new DefinePlugin({
    //   "process.env.NODE_ENV": JSON.stringify("production")
    // }),
    // new UglifyJsPlugin({
    //   sourceMap: true,
    //   beautify: false,
    //   mangle: false,
    //   comments: false,
    //   compress: {
    //     warnings: false,
    //   }
    // })
  ]

};

module.exports = config;
