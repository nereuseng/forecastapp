const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'dist');

module.exports = {
    context: srcPath,
    /*入口*/
    entry: [
        path.join(__dirname, 'src/index.js'),
    ],  
    /*输出到dist文件夹，输出文件名字为bundle.js*/
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },

     /*src文件夹下面的以.js结尾的文件，要使用babel解析*/
 /*cacheDirectory是用来缓存编译结果，下次编译加速*/
    module: {
        rules: [
            {
                test: /\.js$/ ,
                loader:['react-hot-loader/webpack', 'babel-loader'],
                exclude: '/node_modules/'},
            {
                test: /\.jsx$/ ,
                loader:'babel-loader',
                exclude: '/node_modules/'},
                
            {
                test: /\.css$/,
                exclude: /(node_modules)/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options : {
                            url: false
                        }
                    }
                ]},
            {
                test: /\.(png|jpg|gif)$/,
                // exclude: /(node_modules)/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 25000
                    }
                }]    
            }]
    },

    devServer: {
        contentBase: path.join(__dirname, './dist'),
        historyApiFallback: true,
        host: '0.0.0.0'
    },
    
    externals: ['axios'],

    resolve: {
        //bug of webpack:
        //https://github.com/webpack-contrib/css-loader/issues/74
        modules: ['./', 'node_modules'],
        alias: {
            owfont: path.join(__dirname, 'src/component/Forecast/owfont-master'),
            Api: path.join(__dirname, 'src/component/Api'),
            Today: path.join(__dirname, 'src/component/Today'),
            Forecast: path.join(__dirname, 'src/component/Forecast'),
            component: path.join(__dirname, 'src/component'),
            router: path.join(__dirname, 'src/router')
        }
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.bundle.js',
        minChunks: 2
        }), 
        new UglifyJSPlugin(),
    ],
};