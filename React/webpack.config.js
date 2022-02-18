
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const resolve = (p) => path.resolve(__dirname, p);

module.exports = {
    entry: resolve('./index.js'),
    output: {
        path: resolve('./dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ["@babel/preset-react",
                            {
                                runtime: 'automatic',
                                // importSource: "custom-jsx-library" 
                            }]
                        ]
                    }
                },

            }
        ]
    },
    mode: 'development',
    cache: {
        type: 'filesystem',
        allowCollectingMemory: true,
    },
    devServer: {
        static: path.resolve(__dirname, './dist'),
        hot: true,
        port: 9001
    },
    devtool: 'source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: resolve('./public/index.html')
        })
    ]
}