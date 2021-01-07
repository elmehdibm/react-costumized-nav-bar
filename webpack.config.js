const webpack = require('webpack');

module.exports = {
    entry: './index.js',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            }
        ]
    },
    // Use externals to exclude libraries
    externals: ['react'],
    output: {
        path: __dirname + '/react-costumized-nav-bar',
        publicPath: '/',
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    }
};
