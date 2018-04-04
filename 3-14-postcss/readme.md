# postcss的使用

> PostCSS is a tool for transforming CSS with JS plugins. These plugins can support variables and mixins, transpile future CSS syntax, inline images, and more.

你可以在使用预处理器的情况下使用它，也可以在原生的css中使用它。它都是支持的，并且它具备着一个庞大的生态系统，例如你可能常用的Autoprefixer，就是PostCSS的一个非常受欢迎的插件，被Google, Shopify, Twitter, Bootstrap和CodePen等公司广泛使用。

下面，我们来介绍下如何在结合webpack来使用postcss。

安装postcss以及相关插件：

```shell
npm install postcss postcss-loader autoprefixer cssnano postcss-cssnext --save-dev
````

