var webpack = require("webpack"),
    path = require('path'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        "app": [
            'babel-polyfill',
            'react-hot-loader/patch',
        ],
        "vendor": [
            "react",
            "react-dom",
            "react-redux",
            "redux"
        ],
        "index": __dirname + '/src' + '/index.js',
    },
    output: {
        path: __dirname + '/public/',
        publicPath: '/',
        filename: "[name].bundle.js",
        chunkFilename: "[id].bundle.js"
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
        }),
        new ExtractTextPlugin('../css/main.css')
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'react-hot-loader/webpack'
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            'plugins': [
                                'transform-class-properties'
                            ],
                            'presets': [
                                "es2015",
                                "react",
                                "stage-3"
                            ]
                        }
                    }]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                ]
            }
        ]
    },
    devServer: {
        contentBase: __dirname + '/public'
    }
};