var webpack = require("webpack"),
    path = require('path'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: {
        "app": [
            'babel-polyfill',
            'react-hot-loader/patch',
        ],
        "vendor": [
            "react",
            "react-dom",
            "react-jss",
            "react-redux",
            "redux",
            "redux-saga",
            "redux-localstorage",

            "to-mention-link",
            "react-html-parser",
            "react-sortable-hoc",
            "rc-slider",
            "axios",

            'material-ui/IconButton',
            "material-ui/Typography",
            "material-ui/Toolbar",
            "material-ui/Dialog",
            "material-ui/TextField",
            "material-ui/Switch",
            'material-ui/Card',
            'material-ui/Grid',
            'material-ui/Paper',
            'material-ui/Divider',
            'material-ui/AppBar',
            'material-ui/styles',

            'material-ui-icons/KeyboardArrowRight',
            'material-ui-icons/MoreVert',

            "dateformat"

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
        new ExtractTextPlugin('../css/main.css'),
        new BundleAnalyzerPlugin()
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