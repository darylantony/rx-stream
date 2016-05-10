import path from 'path';
import webpack from 'webpack';
const config = {
  cache: true,
  devtool: 'eval-source-map',

  // We add an entry to connect to the hot loading middleware from
  // the page
  entry: [

    // For hot style updates
    'webpack-hot-middleware/client',

    //https://github.com/gaearon/redux-devtools/commit/64f58b7010a1b2a71ad16716eb37ac1031f93915
    'react-hot-loader/patch',

    // Our application
    path.join(__dirname, 'src/client.js'),
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'main.js',
    publicPath: '/',
  },

  // This plugin activates hot loading
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [{
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel',
      }, {
        test: /\.css?$/,
        loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]',
      },
    ],
  },
};

export default config;
