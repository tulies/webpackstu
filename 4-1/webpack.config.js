var path = require('path');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
module.exports = {
    entry: {
        app:'./src/app.js'
    },

    output: {
        filename: '[name].bundle.js',
        path:path.resolve(__dirname, 'dist')
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback:{
                        loader: 'style-loader'
                    },
                    use: [
                        {
                            loader: 'css-loader'
                        }
                    ]
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: {
                    loader: 'file-loader'
                }
            }
        ]
    },

    plugins: [
        new ExtractTextWebpackPlugin({
            filename: '[name].all.css',
            allChunks: false, // 默认为false。给插件指定一个提取范围 如果为false，只会提取初始化的css，非异步加载的
        })
    ]
};