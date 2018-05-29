var webpack = require('webpack');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    entry: './index.jsx',
    output: {
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    module: {
        loaders:[
            { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel', query: {presets: ['es2015', 'react', 'stage-0']}},
            { test: /\.js$/, exclude:/node_modules/, loader: 'babel', query: {
                presets: ['es2015', 'react', 'stage-0']
            }},
            {
                test: /.less/,
                loader: 'style-loader!css-loader!less-loader'
            },
            { test: /\.css$/, loader: "style!css" }
        ]
    },
    babel: {
        plugins: [
            ["import", { libraryName: "antd", style: "css" }] // `style: true` 会加载 less 文件
        ],
    },
    plugins: [
        new CommonsChunkPlugin('init.js'),
        new OpenBrowserPlugin({ url: 'http://localhost:8080' })
    ]
};