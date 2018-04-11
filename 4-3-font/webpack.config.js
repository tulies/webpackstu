var path = require('path');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
module.exports = {
    entry: {
        app:'./src/app.js'
    },

    output: {
        filename: '[name].bundle.js',
        path:path.resolve(__dirname, 'dist'),
        publicPath: 'dist/'
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
                test: /\.(jpe?g|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8000,
                            publicPath:'../assets/imgs',
                            outputPath:'assets/imgs',
                            name: '[name]-[hash:5].[ext]' //设置打包后的图片名字，如果不配置，则默认是hash值作为图片名称
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        //我们有很多个地方用到了url-loader，其实我么把公共的配置提取出来
                        options: {
                            limit: 5000,
                            publicPath:'../assets/font',
                            outputPath:'assets/font',
                            name: '[name]-[hash:5].[ext]' //设置打包后的图片名字，如果不配置，则默认是hash值作为图片名称
                        }
                    }
                ]

            }
        ]
    },

    plugins: [
        new ExtractTextWebpackPlugin({
            filename: 'css/[name].all.css',
            allChunks: false, // 默认为false。给插件指定一个提取范围 如果为false，只会提取初始化的css，非异步加载的
        })
    ]
};