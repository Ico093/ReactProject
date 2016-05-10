var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:9005',
        'webpack/hot/only-dev-server',
        './scripts/main.jsx'
    ],
    output: {
        path: path.resolve('wwwroot/scripts/'),
        filename: 'bundle.js',
        publicPath: '/scripts/'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [{
            test: /\.jsx?$/,
            include: path.join(__dirname, 'scripts'),
            loaders: ['react-hot', 'babel-loader?presets[]=es2015,presets[]=react']
        }]
    }
};