/* jshint esversion: 6 */

const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const htmlPages = ['calc', 'food', 'hundle', 'library', 'user'];
let multiplePlugins = htmlPages.map((page) => {
  if (page === 'food' || page !== 'hundle') {
    return new HtmlWebpackPlugin({
      template: `./src/${page}.html`,
      filename: `${page}.html`,
      inject: false
    });
  } else {
    return new HtmlWebpackPlugin({
      template: `./src/${page}.html`,
      filename: `${page}.html`
    });
  }
});

module.exports = {
  entry: {
    'js/main': './src/js/main.js',
    'js/calc': './src/js/calc.js',
    'js/library': './src/js/library.js',
    'js/user': './src/js/user.js',
    'css/calc': './src/css/calc.css',
    'css/food': './src/css/food.css',
    'css/hundle': './src/css/hundle.css',
    'css/library': './src/css/library.css',
    'css/user': './src/css/user.css',
    'css/main': './src/css/main.css'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  }, 
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader"
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `[name].css`
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/assets', to: './assets' }
      ]
    }),
    new HtmlWebpackPlugin({
      template: `./src/index.html`,
      chunks: ['main', 'maincss']
    })
  ].concat(multiplePlugins)
};