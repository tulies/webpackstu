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
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            singleton: true,
                        //     insertAt: 'bottom',
                        //     insertInto: '#styledom', //要注意引入的js要放在body下面 不然会出现找不到节点
                        //     transform: './css.transform.js'  //指定transform处理的js
                        }
                    },
{
    loader: 'css-loader', //顺序是必要，放在后面的先处理
    options:{
        // alias: 'aaa',
        // minimize: true,
        modules: true, //css module
        localIdentName: '[path][name]_[local]--[hash:base64:5]'
    }
}
                ]
            }
        ]
    }
};