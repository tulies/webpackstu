# 处理第三方JS库

webpack自动导入处理第三方库，有两种方式：

- 使用webpack自带的插件`ProvidePlugin`
- 使用`imports-loader`

## 使用ProvidePlugin

index.html代码：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>ProvidePlugin-imports-loader</title>
</head>
<body>
</body>
<script src="dist/app.bundle.js" ></script>
</html>
```

app.js代码：

```javascript
$('body').append('hello world'); // 你没看错，就这一行代码，js中直接使用$, 不用inport第三方库，具体如何引入是在webpcak.config.js中配置。
```

webpack.config.js代码：

```javascript
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

    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery'  //默认是查找npm安装的本地模块，如果没有找到就会找当前resole的alias中配置的。
        }),
    ],

    // resolve: {
    //     alias: {
    //         jquery$: path.resolve(__dirname, 'src/libs/jquery.min.js')
    //     }
    // }

};
```

综上，我们通过ProvidePlugin就完成了第三方库的引入。

## 使用imports-loader

需要先安装`imports-loader`：

```shell
npm install inports-loader --save-dev
```
直接上配置代码：
```javascript
    module: {
        rules: [
            {
                test: path.resolve(__dirname, 'src/app.js'),
                use:[
                    {
                        loader:'imports-loader',
                        options: { //这个options的配置和ProvidePlugin的一样
                            $: 'jquery'
                        }
                    }
                ]
            }
        ]
    }
```

没什么可说的。看配置自己练习吧。