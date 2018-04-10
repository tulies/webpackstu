# css中实现tree-shaking的使用

## css中如何使用tree shaking

之前的文章中，我们说明了js中如何实现tree shaking，下面我们说下在css中如何实现tree shaking。

在css中我们使用`purifycss-webpack`插件来实现。 [purifycss-webpack说明](https://www.npmjs.com/package/purifycss-webpack)

```shell
npm install purify-css purifycss-webpack glob-all --save-dev
```

当然了之前我们学过的一些css相关的loader和plugins不要忘记安装。如：style-loader、css-loader、extract-text-webpack-plugin。


webpack.config.js配置代码：

```javascript
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
```

index.css代码：

```css
/***  src/css/index.css ***/
html{
    background: #7e3a6f;
}
#indexbody{
    font-size: 100px;
}
.divbox{
    width: 100px;
    height: 100px;
}
.box3{
    width: 140px;
    height: 100px;
}
.boxx3{
    width: 200px;
    height: 100px;
}
```

app.js代码：

```javascript
import index from './css/index.css';

var indexbody = document.getElementById('indexbody');
var div = document.createElement('div');
div.className = 'divbox'
indexbody.appendChild(div)
```

最终生成的css文件`app.all.css`中的代码为：

```css
html {
  background: #7e3a6f;
}

#indexbody {
  font-size: 100px;
}

.divbox {
  width: 100px;
  height: 100px;
}
```

从上面可以看到html（html文件根元素）、#indexbody（html文件中body元素上的id），.divbox（js中插入的），用到的css都被提取出来了。而`.box3`、`.boxx3`没有用到，则被剔除掉了。

> 说个bug问题，如果我们在文件中用到的classname为`box`或`box1`,却会把`.box3`的样式给提取出来了，但是`.boxx3`却没有提取出来。

由此可见purifycss会将选择器名的末尾数字过滤掉进行匹配。可以参见这个issues：https://github.com/webpack-contrib/purifycss-webpack/issues/119


> css的tree-shaking其实和css modlue是不能同时用的，但是我们可以设置一些白名单来解决。


