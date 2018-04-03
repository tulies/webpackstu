# 起步 ﻿

## webpack核心概念

* 通过`webpack -v`可以查看webpack版本：

```shell
﻿$ webpack -v
3.10.0
```

* 通过`webpack -h`查看当前可以用哪些命令：

```shell
﻿$ webpack -h
webpack 3.10.0
Usage: https://webpack.js.org/api/cli/
Usage without config file: webpack <entry> [<entry>] <output>
Usage with config file: webpack

Config options:
  --config       Path to the config file
                          [字符串] [默认值: webpack.config.js or webpackfile.js]
  --config-name  Name of the config to use                              [字符串]
  --env          Environment passed to the config, when it is a function
  
  。。。。下面还有若干
```

## 使用webpack

﻿
从usage上可以看到webpack的使用有2种方式，1种是不使用config文件，另外1种是使用config。下面我们再举例说明使用的方式。

一.不使用config文件配置，直接使用命令（`webpack <entry> [<entry>] <output>`）。 简单的可以这样，复杂的还是采用配置文件。

```shell
﻿webpack app.js bundle.js
```

* app.js 入口文件名
* bundle.js 合并后输出的文件名。


二.﻿使用config文件：

* ﻿在项目目录下新建名为“webpack.config.js”的文件。文件基础内容如下：

```javascript
module.exports = {
    entry: {
        app: './app.js'
    },
    output: {
        filename: 'bundle.js'
        // filename: '[name].[hash:5].js' //采用这种动态生成文件名。
    }
};
```

* 然后即可直接在执行`webpack`。

## 一些概念知识

### 几个主要的配置参数  
1、entry：代码的入口、打包的入口、单个或多个  
2、output：打包成的文件、一个或多个、自定义规则、配合CDN  
3、loaders：处理文件、转化为模块  
4、plugins：参与打包整个过程、打包优化和压缩、配置编译时的变量

﻿
### 常用的loader：
* 编译相关：  
babel-loader  
ts-loader
* 样式相关  
style-loader  
css-loader  
less-loader  
postcss-loader  
* 文件相关  
file-loader  
url-loader

### 常用的plugins：

* 优化相关  
CommonsChunkPlugin  
UglifyjsWebpackPlugin  
* 功能相关  
ExtractTextWebpackPlugin  
HtmlWebpackPlugin  
HotModuleReplacementPlugin  
CopyWebpackPlugin  


