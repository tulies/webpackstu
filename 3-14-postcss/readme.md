# postcss的使用

> PostCSS is a tool for transforming CSS with JS plugins. These plugins can support variables and mixins, transpile future CSS syntax, inline images, and more.

你可以在使用预处理器的情况下使用它，也可以在原生的css中使用它。它都是支持的，并且它具备着一个庞大的生态系统，例如你可能常用的Autoprefixer，就是PostCSS的一个非常受欢迎的插件，被Google, Shopify, Twitter, Bootstrap和CodePen等公司广泛使用。

下面，我们来介绍下如何在结合webpack来使用postcss。

安装postcss以及相关插件：

```shell
npm install postcss postcss-loader autoprefixer cssnano postcss-cssnext --save-dev
````
> postcss-loader用在css-loader之前,less/sass等预处理loader之后。

webpack配置如：

```javascript
var path = require('path');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: './src/app.js'
    },

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist'),
        publicPath: './dist/',
        chunkFilename:'[name].bundle.js' //指定动态打包的名字
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
                            loader: 'css-loader',
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: [
                                    // 自动加浏览器前缀
                                    // require('autoprefixer')(),
                                    require('postcss-cssnext')()
                                ]
                            }
                        }
                    ]
                })
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
```


- autoprefixer ﻿帮助我们自动加上各浏览器的前缀
- cssnano ﻿帮助我们优化css、压缩css；css-loader中其实已经用了cssnano的压缩功能。
- cssnext 让我们可以使用未来的css语法 如`css variables`、`custom selectors`、`calc()`；  
  cssnext中已经包含了autoprefixer
  
> 一旦涉及到浏览器兼容性的问题，我们就一会会有个针对性，比如语法解析是要针对所需要浏览器版本进行控制。其实就是用到Browserslist。 

webpack中es-load、postcss等loader都需要通过browserlist来进行控制，那么这时候我们就可以将这些配置统一放在一个地方进行配置。

通过项目根目录下新建.browserslistrc文件进行配置或在package.json使用browserslist属性是实现。

```text
# .browserslistrc 配置
iOS >= 7
Android > 4.1
Firefox > 20
last 2 versions
```

```text
# package.json 中新加browserslist属性字段配置
{
  "browserslist": [
    "iOS >= 7",
    "Android > 4.1",
    "Firefox > 20",
    "last 2 versions"
  ]
}
```

具体的browserslist有哪些配置可选择，参考[Browserslist说明](https://github.com/browserslist/browserslist#queries)

其他还有一些postcss的插件，如`postcss-mport`、`postcss-url`、`post-assets`我们会在后面再做学习使用。
