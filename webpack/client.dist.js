const path = require('path')
const webpack = require('webpack')
const common = require('./common')

// TODO 改成console.log输出
/*
const banner = (function () {
    const pgk = require('../package.json')
    return [
        'Author: ' + (pgk.author || '*'),
        'Description: ' + (pgk.email || '*'),
        'Update: ' + new Date().toLocaleString()
    ].join('\n')
})()*/

// var autoprefixer = require('autoprefixer')

module.exports = (appPath, port) => ({
    target: 'web',
    devtool: 'source-map',
    entry: [
        path.resolve(appPath, './client/index.js')
    ],
    output: {
        filename: 'client.js',
        chunkFilename: '[id].[name].chunk.js',
        // path: appPath + '/server/public/client',
        path: appPath + '/dist/public/client',
        publicPath: '/client/' // TODO 改成静态第三方URL用于CDN部署 http://localhost:3000/
    },
    module: {
        rules: [...common.rules]
    },
    plugins: [
        // 在node执行环境中设置，不起作用，此处不能省略
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.DefinePlugin({
            '__CLIENT__': true,
            '__SERVER__': false,
            '__DEV__': false
        }),
        new webpack.NoErrorsPlugin(),
        ...common.plugins,
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            beautify: false,
            comments: false,
            sourceMap: true
        })
    ]
})
