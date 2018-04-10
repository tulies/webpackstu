# 文件处理-图片处理

图片处理有如下：

- css中引入的图片，用到`file-loader`
- base64编码，用到`url-loader`  url-loader包含了file-loader的功能
- 自动合成雪碧图，用到`postcss-sprites`
- 压缩图片，用到`img-loader`


直接上代码吧：

```javascript
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
                test: /\.(png|jpg|jpeg|gif)$/,
                // use: {
                //     loader: 'file-loader',
                //     options: {
                //         publicPath:'../assets/imgs',
                //         outputPath:'assets/imgs',
                //         // useRelativePath: true,
                //         // context:'/'
                //     }
                // },
                use: {
                    loader: 'url-loader', // url-loader包含了file-loader的功能，多了个limit参数
                    options: {
                        limit: 8000, //小于这个大小的图片将采用base64编码。
                        publicPath:'../assets/imgs',
                        outputPath:'assets/imgs',
                        // useRelativePath: true,  //这个相对路径真心不好用，新版本的参数与老版本又有所变化了。
                        // context:'/'
                    }
                },

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
```

其他的我就不放代码了。 直接github上看我代码示例去吧。