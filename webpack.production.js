const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const Dotenv = require('dotenv-webpack');
const config = {
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new ImageminPlugin({
      bail: false, // Ignore errors on corrupted images
      cache: true,
      imageminOptions: {
        // Lossless optimization with custom option
        // Feel free to experement with options for better result for you
        plugins: [
          ["gifsicle", {
            interlaced: false
          }],
          ["mozjpeg", {
            progressive: true,
            arithmetic: false,
          }],
          ["pngquant", {
            floyd: 0.5,
            speed: 2
          }],
          ["svgo", {
            plugins: [{
                removeTitle: true
              },
              {
                convertPathData: false
              }
            ]
          }]
        ]
      }
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.SourceMapDevToolPlugin({
      filename: "[name].js.map",
      exclude: ["vendor.js"],
    }),
    new Dotenv({path: './.env.production'}),
    new UglifyJsPlugin({
      uglifyOptions: {
        output: {
          comments: false, // remove comments
        },
        compress: {
          unused: true,
          dead_code: true, // big one--strip code that will never execute
          warnings: false, // good for prod apps so users can't peek behind curtain
          drop_debugger: true,
          conditionals: true,
          evaluate: true,
          drop_console: true, // strips console statements
          sequences: true,
          booleans: true,
        },
      },
    }), // 52ff05a530ba06b74e85.bundle.js  267 KiB
    new webpack.optimize.AggressiveMergingPlugin(),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        include: /\/includes/,
      }),
    ],
    splitChunks: {
      name: true,
      cacheGroups: {
        commons: {
          chunks: "initial",
          minChunks: 2,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          priority: -10,
        },
      },
    },
    runtimeChunk: false,
  },
  mode: "production", //production,development
  devtool: "cheap-module-source-map", //cheap-module-source-map
  performance: {
    hints: process.env.NODE_ENV === "production" ? "warning" : false,
  },
  node: {
    net: "empty",
    dns: "empty",
  },
  devServer: {
    compress: true,
    before(app) {
      app.get("*.js", function (req, res, next) {
        req.url = req.url + ".gz";
        res.set("Content-Encoding", "gzip");
        res.set("Content-Type", "text/javascript");
        next();
      });

      app.get("*.css", function (req, res, next) {
        req.url = req.url + ".gz";
        res.set("Content-Encoding", "gzip");
        res.set("Content-Type", "text/css");
        next();
      });
      app.use(
        compression({
          level: 2, // set compression level from 1 to 9 (6 by default)
          filter: shouldCompress, // set predicate to determine whether to compress
        })
      );
    },
  },
};
module.exports = merge(common, config);