# tree-shaking的使用

## 什么是tree shaking

tree shaking首先是由rollup的作者提出的，它是DCE（dead code elimination）的一个实现，通过tree shaking的分析，可以使你代码里没有使用的代码全部删除。

webpack 里的tree-shaking的到来不得不归功于es6规范的模块。为什么这么说，如今的前端模块规范很多，比较出流行的比如commonJS , AMD , es6 ，下面简单的说一下commonJS和es6模块的区别。

> - commonJS 模块  
> commonJS的模块规范在Node中发扬光大，总的来说，它的特性有这几个：
>   - 动态加载模块  
> commonJS和es6的最大区别大概就在于此了吧，commonJS模块的动态加载能够很轻松的实现懒加载，优化用户体验。
>   - 加载整个模块  
> commonJS模块中，导出的是整个模块。
>   - 每个模块皆为对象  
> commonJS模块都被视作一个对象。
>   - 值拷贝  
> commonJS的模块输出和 函数的值传递相似，都是值的拷贝
> - es6 模块
>   - 静态解析  
> 即在解析阶段就确定输出的模块，所以es6模块的import一般写在被引入文件的开头。
>   - 模块不是对象  
> 在es6里，每个模块并不会当做一个对象看待
>   - 加载的不是整个模块  
> 在es6模块中经常会看见一个模块中有好几个export 导出
>   - 模块的引用  
> es6模块中，导出的并不是模块的值拷贝，而是这个模块的引用

在结合es6模块和commonJS模块的区别之后，我们知道es6的特点是静态解析，而commonJS模块的特点是动态解析的，因此，借于es6模块的静态解析，tree-shaking的实现才能成为可能。

在webpack中，tree-shaking指的就是按需加载，即没有被引用的模块不会被打包进来，减少我们的包大小，缩小应用的加载时间，呈现给用户更佳的体验。

## js中如何使用tree shaking

使用webpack自带的插件：`Webpack.optimize.uglifyJS`,所以你需要在当前项目本地安装下webpack，我们使用的是`webpack@3.10.0`。

**简单的示例代码**：

webpack的配置如：

```javascript
var Webpack = require('webpack');
var path = require('path');
module.exports = {
    entry:{
        app:'./src/app.js'
    },

    output:{
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: './dist/',
        chunkFilename: '[name].bundle.js'
    },
    // module:{
    //     rules:[
    //     ]
    // },
    plugins:[
        //js tree-shaking的插件
        new Webpack.optimize.UglifyJsPlugin() 
    ]
};
```

app.js:

```javascript
import { a } from './scripts/comm';
a();
```

scripts/comm.js：

```javascript
export function a(){
    console.log('aaaaa');
}

export function b(){
    console.log('aaaaa');
}

export function c(){
    console.log('aaaaa');
}
```

通过上面的这代码配置后，最终我们可以发现在打包后的app.bundle.js中仅包含function a这个方法。 b和c的function就被剔除了。

> - 再强调下，只有es6的模块输出方式才能被tree shaking。特别是我们引用第三方组件的时候，记得一定要引用第三方库的es-module版本，当然还要引入babel相关的loader、 plugins。我就不细说了，点到为之，出现问题自己记得这种问题所在。
> - 为什么你的代码并没有tree-shaking？可以参考这个文章：[你的Tree-Shaking并没什么卵用](https://segmentfault.com/a/1190000012794598#articleHeader0)

参考：[webpack 如何优雅的使用tree-shaking（摇树优化）](https://blog.csdn.net/haodawang/article/details/77199980)

