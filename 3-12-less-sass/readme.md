# 配置Less/Sass

## 配置less和sass

安装less和sass相应的loader

```shell
npm install less less-loader --save-dev
npm install node-sass sass-loader --save-dev
```

webpack代码：

```javascript
var path = require('path');
module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                // loader: 'style-loader!css-loader!less-loader' // 简写的话 不方便配置options
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'less-loader',
                    }
                ]
            }
        ]
    }
};
```

> 注意：less-loader放在最下面。

sass的我就不演示了，与less类似。

