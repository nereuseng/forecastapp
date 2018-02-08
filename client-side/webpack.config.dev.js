const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'dist');

module.exports = {
    // devtool: 'cheap-module-eval-source-map',
    // devtool: 'eval',
    devtool: 'source-map',
    devtool: 'eval',
    context: srcPath,
    /*入口*/
    entry: [
        path.join(__dirname, 'src/index.js'),
        'react-hot-loader/patch',
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
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['env'],
                    plugins: ['transform-runtime']
                  }
                }
              },
              {
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['env'],
                    plugins: ['transform-runtime']
                  }
                }
              },
                
            {
                test: /\.css$/,
                exclude: /node_modules/,
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
                exclude: /node_modules/,
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
        hot: true,
        // host: '0.0.0.0',
        port: process.env.PORT || 8080,
        // public: 'forecastapps.herokuapp.com'
    },

    resolve: {
        //bug of webpack:
        //https://github.com/webpack-contrib/css-loader/issues/74
        modules: ['./', 'node_modules'],
        alias: {
            src: path.join(__dirname, './src'),
            component: path.join(__dirname, 'src/component'),
            Api: 'src/Api',
            router: 'src/router',
            states: 'src/states',
            images: path.join(__dirname, 'dist/images'),
            owfont: 'Forecast/owfont-master',
            Today: 'component/Today',
            Forecast: 'component/Forecast',
            Utility: 'src/Utility'
        }
    },

    plugins: [
        //https://github.com/moment/moment/issues/2979
        new webpack.IgnorePlugin(/\.\/locale$/),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.bundle.js',
        minChunks: 2
        }), 
        // new UglifyJSPlugin(),
        // new webpack.DefinePlugin({
        //     'process.env': {
        //       'NODE_ENV': JSON.stringify('production')
        //     }
        // }),
    ],
};