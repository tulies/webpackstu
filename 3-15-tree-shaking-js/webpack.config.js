var Webpack = require('webpack');
var path = require('path');
var Purifycss = require('purifycss-webpack');
var glob = require('glob-all');
module.exports = {
    entry:{
        app:'./src/app.js'
    },

    output:{
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: './dist/',
        chunkFilename: '[name].bundle.js'
    },
    // module:{
    //     rules:[
    //     ]
    // },
    plugins:[
        new Webpack.optimize.UglifyJsPlugin()
    ]
};