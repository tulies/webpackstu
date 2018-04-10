var Webpack = require('webpack');
var path = require('path');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
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
        chunkFilename:'[name].bundle.js' //指定动态打包的名字
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback:{
                        loader:'style-loader',
                        options: { singleton: true }
                    },
                    use: [
                        {
                            loader: 'css-loader',
                            // options: { modules: true}
                        }
                    ]
                })
            }
        ]
    },
    plugins:[
        new ExtractTextWebpackPlugin({
            filename: '[name].all.css',
            allChunks: false, // 默认为false。给插件指定一个提取范围 如果为false，只会提取初始化的css，非异步加载的
        }),
        // Make sure this is after ExtractTextPlugin!
        // CSS Tree shaking  这个要放在ExtractTextWebpackPlugin的下面
        new Purifycss({
            paths: glob.sync([
                // Give paths to parse for rules. These should be absolute!
                path.join(__dirname, './*.html'), //处理html模板中用到的css
                path.join(__dirname, './src/*.js'), //处理src目录下的所有js中引用的css
            ])
        }),
        new Webpack.optimize.UglifyJsPlugin()

    ]
};