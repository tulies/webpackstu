# 字体文件处理

与图片处理一样，用的是`url-loader`,请看下面的代码示例：

```javascript
{
    test: /\.(woff2?|eot|ttf|svg)$/,
    use: [
        {
            loader: 'url-loader',
            //我们有很多个地方用到了url-loader，其实我么把公共的配置提取出来
            options: {
                limit: 5000,
                publicPath:'../assets/font',
                outputPath:'assets/font',
                name: '[name]-[hash:5].[ext]' //设置打包后的图片名字，如果不配置，则默认是hash值作为图片名称
            }
        }
    ]
}
```

css代码：

```css
@font-face {
    font-family: 'FontAwesome';
    src: url('../assets/fonts/fontawesome-webfont.eot?#iefix&v=4.7.0') format('embedded-opentype'),
    url('../assets/fonts/fontawesome-webfont.woff2?v=4.7.0') format('woff2'),
    url('../assets/fonts/fontawesome-webfont.woff?v=4.7.0') format('woff'),
    url('../assets/fonts/fontawesome-webfont.ttf?v=4.7.0') format('truetype'),
    url('../assets/fonts/fontawesome-webfont.svg?v=4.7.0#fontawesomeregular') format('svg');
    font-weight: normal;
    font-style: normal;
}
.fa {
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.fa-folder:before {
    content: "\f07b";
}
```

