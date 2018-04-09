# css中实现tree-shaking的使用

## css中如何使用tree shaking

之前的文章中，我们说明了js中如何实现tree shaking，下面我们说下在css中如何实现tree shaking。

在css中我们使用`purifycss-webpack`插件来实现。

```shell
npm install purifycss-webpack glob-all --save-dev
```

我们直接拷贝`extract-css`章节中的代码来修改。


> css的tree-shaking其实和css modlue是不能同时用的，但是我们可以设置一些白名单来解决。

