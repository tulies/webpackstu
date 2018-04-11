# 文件处理-图片处理

之前的章节我们说了，`file-loader`和`url-loader`的使用，下面我说说下面2个图片处理：

- 自动合成雪碧图，用到`postcss-sprites`
- 压缩图片，用到`img-loader`


直接上代码，大家直接到代码中找相关的配置代码，我在代码中也加了相关的说明。

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
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: [
                                    require('postcss-sprites')({
                                        spritePath: 'dist/assets/imgs/sprites',
                                        // retina: true //如果设置为true，支持retina屏，我们还需要告诉sprites哪些图片是retina屏的，比如图片以"@2x"结尾的。 相对的css也是需要有所变化的，图片大小是原容器的宽高的2倍。
                                    }),
                                    // 自动加浏览器前缀
                                    // require('autoprefixer')(),
                                    require('postcss-cssnext')() //postcss-cssnext中包含了autoprefixer的功能
                                ]
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1000,
                            publicPath:'../assets/imgs', //发布的路径
                            outputPath:'assets/imgs', //图片存放的路径
                            name: '[name]-[hash:5].[ext]' //设置打包后的图片名字，如果不配置，则默认是hash值作为图片名称
                        }
                    },
                    {
                        loader: 'img-loader',
                        options: {
                            pngquant: { //参数配置可参考https://github.com/imagemin/imagemin-pngquant
                                quality: 80 //压缩比例 80%的压缩比
                            },
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
```

本节基本没啥难度，关键在于自己要去练习一遍，若有不清楚配置的可以直接取npm或github去查看说明文档。

