var webpack = require('webpack'),
  path = require('path'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.resolve('src'),
  eslint: {
    configFile: './.eslintrc'
  },
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
    './main.jsx'
  ],
  devtool: 'source-map',
  output: {
    path: path.resolve('public/'),
    filename: 'bundle.js'
  },
  resolve: {
    // alias: { },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        include: [new RegExp(path.join(__dirname, 'src'))],
        loaders: ['eslint']
      }
    ],
    loaders: [

      {test: /\.jsx?$/, exclude: /(node_modules|bower_components)/, loaders: ['react-hot', 'babel?stage=0']},

      {test: /\.css$/, loader: ExtractTextWebpackPlugin.extract('style-loader', 'css-loader')},

      {test: /\.scss$/, loader: ExtractTextWebpackPlugin.extract('style-loader', 'css-loader!sass-loader')},

      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},

      {test: /\.(woff|woff2)$/, loader: "url?prefix=font/&limit=5000"},

      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},

      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"},

      {test: /\.gif/, loader: "url-loader?limit=10000&mimetype=image/gif"},

      {test: /\.jpg/, loader: "url-loader?limit=10000&mimetype=image/jpg"},

      {test: /\.png/, exclude: /(images)/, loader: "url-loader?limit=10000&mimetype=image/png"},

      {test: /\.png$/, include: /(images)/, loader: 'file-loader?name=/images/[name].[ext]'},

      {test: /\.ico$/, include: /(images)/, loader: "url-loader?limit=10000&mimetype=image/x-icon"},

      {test: /[\/\\]node_modules[\/\\]some-module[\/\\]index\.js$/, loader: "imports?this=>window"},

      {test: /[\/\\]node_modules[\/\\]some-module[\/\\]index\.js$/, loader: "imports?define=>false"}

    ]
  },
  devServer: {
    contentBase: "./public",
    noInfo: true,
    quiet: true,
    hot: true,
    inline: true
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new webpack.NoErrorsPlugin(),
    new CopyWebpackPlugin([
      {from: path.resolve('static') + '/index.html'}
    ]),
    new ExtractTextWebpackPlugin('bundle.css')
  ]
};
