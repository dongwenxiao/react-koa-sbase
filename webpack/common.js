const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const path = require('path')
const appPath = process.cwd()

// 执行顺序，从右到左
const rules = [
    {
        test: /\.(js|jsx)$/,
        use: [{
            loader: 'babel-loader'
        }]
    }, {
        test: /\.json$/,
        loader: 'json-loader'
    }, {
        test: /\.css$/,
        loader: 'wrapper-css-loader?length=4!postcss-loader'
    }, {
        test: /\.gcss$/,
        loader: 'wrapper-css-loader?length=3&wapper=false!postcss-loader'
    }, {
        test: /\.png$/, loader: 'url-loader?limit=100000'
    }, {
        test: /\.(ico|gif|jpg|jpeg|svg|webp)$/,
        loaders: ['file?context=static&name=/[path][name].[ext]'],
        exclude: /node_modules/
    }
]

// 执行顺序，
const plugins = [
    new webpack.LoaderOptionsPlugin({
        options: {
            postcss: function () {
                return [
                    // https://github.com/postcss/postcss-import
                    // postcssImport({
                    //     addDependencyTo: webpack
                    // }),
                    autoprefixer({ browsers: ['last 2 versions'] })
                ]
            }
        }
    })
]

const resolve = {
    modules: [
        'node_modules',
        path.resolve(appPath, './base/client/containers'),
        path.resolve(appPath, './base/server/modules')
    ],
    extensions: ['.js', '.jsx', '.json', '.css', '.gcss']
}

module.exports = {
    rules,
    plugins,
    resolve
}
