module.exports = {
    entry: {
        app: './app.js'
    },
    output: {
        filename: '[name].[hash:8].js'
    },
    //通过module制定loader
    module: {
        rules: [
            {
                test: /\.js$/,
                // exclude: '/node_modules/',
                // use: 'bable-loader',
                use: [{
                    loader: 'babel-loader',
                    // include: '',
                    // options: {
                    //     presets: ['env']
                    //     // presets: [
                    //     //     ['env',{
                    //     //         targets: {
                    //     //             browsers: ['> 1%'],
                    //     //             // chrome: '52',
                    //     //         }
                    //     //     }]
                    //     // ].babelrc
                    //
                    // }
                }]
            }
        ]
    }
};