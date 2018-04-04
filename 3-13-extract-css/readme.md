# 提取CSS

将本来镶嵌js中的css抽离到外面来，防止将样式打包在js中引起页面样式加载错乱的现象，我们需要用到借助插件来实现，有如下2个插件：

- extract-loader
- extract-text-webpack-plugin (这个比较主流，本文就使用这个介绍)

> [查看extract-text-webpack-plugin文档介绍](https://www.npmjs.com/package/extract-text-webpack-plugin)

npm安装：

```shell
npm install extract-text-webpack-plugin --save-dev
```

若报`Error: Cannot find module 'webpack/lib/Chunk'` ,记得安装webpack。如我用的是webpack3.10.0版本。`npm install webpack@3.10.0 --save-dev`

一个简单的配置demo
```javascript
var path = require('path');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: './dist/',
        chunkFilename:'[name].bundle.js' //指定动态打包的名字
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback:{
                        loader:'style-loader'
                    },
                    use: [
                        {
                            loader: 'css-loader'
                        }
                        //如果用到了less、sass，那么loader也写在这
                    ]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextWebpackPlugin({
            filename: '[name].all.css',
            allChunks: true, // 默认为false。给插件指定一个提取范围 如果为false，只会提取初始化的css，非异步加载的
        })
    ]

};
```

