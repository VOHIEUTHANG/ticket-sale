console.log("development");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const Dotenv = require('dotenv-webpack');
const devServer = {
  port: 4321,
  open: true,
  disableHostCheck: true,
  historyApiFallback: true,
  overlay: true,
  stats: "minimal",
  inline: true,
  compress: true,
  contentBase: "/",
  clientLogLevel: "error",
  public: 'localhost:4321',
};
const config = {
  mode: "development", //production,development
  devtool: "source-map", //cheap-module-source-map
  devServer,
  plugins: [
    new Dotenv({path: './.env.development'}),
  ]
};
module.exports = merge(common, config);
