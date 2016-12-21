const webpack = require('webpack')
const autoprefixer = require('autoprefixer')

// 执行顺序，从右到左
const rules = [
    {
        test: /\.(js|jsx)$/,
        use: [{
            loader: 'babel-loader'
        }]
    }, {
        test: /\.json$/,
        loader: 'json'
    }, {
        test: /\.css$/,
        loader: 'wapper-css-loader?length=4!postcss-loader'
    }, {
        test: /\.gcss$/,
        loader: 'wapper-css-loader?length=3&wapper=false!postcss-loader'
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
                    autoprefixer({browsers: ['last 2 versions']})
                ]
            }
        }
    })
]

module.exports = {
    rules,
    plugins
}
