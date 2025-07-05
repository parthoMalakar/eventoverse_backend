// webpack.config.js
const path = require("path");

module.exports = {
  entry: "./app.js", // Pointing to your existing entry file
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"), // Output folder
  },
  target: "node", // Since it's a backend app
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
