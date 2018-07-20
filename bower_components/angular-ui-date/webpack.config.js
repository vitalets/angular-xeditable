// const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {

  entry: {
    date: './src/date.js',
  },

  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'angularUiDate',
    publicPath: 'assets',
  },

  module: {
    loaders: [
      {
        test: /(\.js$)/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
        },
      },
    ],
  },

  externals: {
    angular: 'angular',
    'jquery-ui/datepicker': 'jquery-ui/datepicker',
    jquery: {
      root: 'jQuery',
      commonjs: 'jquery',
      commonjs2: 'jquery',
      amd: 'jquery',
    },
  },
  // plugins: [
  //   new HtmlWebpackPlugin({ // Also generate a test.html
  //     filename: 'index.html',
  //     template: 'src/index.html',
  //     inject: 'body'
  //   }),
  // ],

  devtool: '#cheap-source-map',
  devServer: {
    contentBase: './demo',
  },
};
