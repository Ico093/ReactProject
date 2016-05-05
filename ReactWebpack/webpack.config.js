var path = require('path');

module.exports = {
    context: __dirname,
    entry: './scripts/main.js',
    output: {
        path: path.resolve('wwwroot/scripts/'),
        filename: 'bundle.js'
    },
    
    devServer: {
        contentBase: 'wwwroot'
    },

    resolve: {
        extensions: ['', 'js']
    }
};