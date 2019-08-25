const path = require('path');
module.exports = {
    mode: 'production',
    entry: {
        control: './js/control.js'
    },
    output: {
        filename: 'main.bundle.js',
        path: path.resolve(__dirname,'./js')
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    },
    stats: {
      warnings: false
    }
  };