var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        app: './src/app.js'
    },

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    // module: {
    //     rules: [
    //         {
    //             test: path.resolve(__dirname, 'src/app.js'),
    //             use:[
    //                 {
    //                     loader:'imports-loader',
    //                     options: { //这个options的配置和ProvidePlugin的一样
    //                         $: 'jquery'
    //                     }
    //                 }
    //             ]
    //         }
    //     ]
    // },

    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery'  //默认是查找npm安装的本地模块，没有没有找到就会找
        }),
    ],

    // resolve: {
    //     alias: {
    //         jquery$: path.resolve(__dirname, 'src/libs/jquery.min.js')
    //     }
    // }

};