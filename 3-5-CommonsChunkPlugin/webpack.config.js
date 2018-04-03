var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        pageA:'./src/pageA.js',
        pageB:'./src/pageB.js',
        vendor:['lodash']
    },
    output:{
        path:path.resolve(__dirname, './dist'), //输出到的指定目录下
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        // new webpack.optimize.CommonsChunkPlugin({
        //     names:['common', 'vendor'], //这个设置的是chunk后的名称 chunkFilename中会用
        //     minChunks:2, //设置成Infinity表示不去校验出现次数，我也解释不清，只能操作理解。
        // }),

        //上面的代码也可以这样：
        new webpack.optimize.CommonsChunkPlugin({
            name:'common', //这个设置的是chunk后的名称 chunkFilename中会用
            minChunks:2, //设置成Infinity表示任何代码都不打包进去
            chunks: ['pageA','pageB']
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names:['vendor', 'manifest'], //这个设置的是chunk后的名称 chunkFilename中会用
            minChunks:Infinity, //设置成Infinity表示任何代码都不打包进去
        })

    ]

};