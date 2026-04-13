const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
//const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  // https://webpack.js.org/configuration/mode/
  mode: "development",

  // This option controls if and how source maps are generated.
  // https://webpack.js.org/configuration/devtool/
  devtool: "eval-cheap-module-source-map",

  // https://webpack.js.org/concepts/entry-points/#multi-page-application
  entry: {
    index: "./src/index.js",
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
  },

  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },

  // https://webpack.js.org/concepts/loaders/
  module: {
    rules: [
      {
        // https://webpack.js.org/loaders/babel-loader/#root
        test: /\.m?js$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        // https://webpack.js.org/loaders/css-loader/#root
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        // https://webpack.js.org/guides/asset-modules/#resource-assets
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: "asset/resource",
      },
      {
        // https://webpack.js.org/guides/asset-modules/#replacing-inline-loader-syntax
        resourceQuery: /raw/,
        type: "asset/source",
      },
      {
        // https://webpack.js.org/loaders/html-loader/#usage
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },

  // https://webpack.js.org/concepts/plugins/
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: true,
      chunks: ["index"],
      filename: "index.html",
    }),
    // new CopyPlugin({
    //   patterns: [
    //     { from: "public", to: "" }, // copies everything into dist/
    //   ],
    // }),
  ],
};
