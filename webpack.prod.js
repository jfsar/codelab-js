const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
// const CopyPlugin = require("copy-webpack-plugin");

const buildPath = path.resolve(__dirname, "dist");

module.exports = {
  // https://webpack.js.org/configuration/mode/
  mode: "production",

  // This option controls if and how source maps are generated.
  // https://webpack.js.org/configuration/devtool/
  devtool: "source-map",

  // https://webpack.js.org/concepts/entry-points/#multi-page-application
  entry: {
    index: "./src/index.js",
  },

  // how to write the compiled files to disk
  // https://webpack.js.org/concepts/output/
  output: {
    filename: "[name].[contenthash].js",
    path: buildPath,
    clean: true,
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
        use: [MiniCssExtractPlugin.loader, "css-loader"],
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
    new MiniCssExtractPlugin(),
    // new CopyPlugin({
    //   patterns: [
    //     { from: "public", to: "" }, // copies everything into dist/
    //   ],
    // }),
  ],

  // https://webpack.js.org/configuration/optimization/
  optimization: {
    minimize: true,
    minimizer: [
      // https://webpack.js.org/plugins/terser-webpack-plugin/
      new TerserPlugin({
        parallel: true,
      }),
      // https://webpack.js.org/plugins/mini-css-extract-plugin/#minimizing-for-production
      new CssMinimizerPlugin(),
    ],
  },
};
