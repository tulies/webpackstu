module.exports = {
    entry: {
        app: './src/app.ts'
    },
    output: {
        filename: '[name].[hash:8].js'
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: {
                loader: 'ts-loader'
            }
        }]
    }
};