const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const webpack = require("webpack");
const Autoprefixer = require("autoprefixer");

const ASSET_PATH = process.env.ASSET_PATH || "/";

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.DefinePlugin({
      "process.env.ASSET_PATH": JSON.stringify(ASSET_PATH)
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash].css"
    }),
    new OptimizeCssAssetsPlugin(),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      filename: "index.html"
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      navigateFallback: "/index.html",
      navigateFallbackWhitelist: [/^\/home$/g, /^\/learn$/g]
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [Autoprefixer]
            }
          }
        ]
      }
    ]
  },
  output: {
    filename: "static/js/[contenthash].js",
    path: path.resolve(__dirname, "../build"),
    publicPath: ASSET_PATH,
    pathinfo: false
  }
};
