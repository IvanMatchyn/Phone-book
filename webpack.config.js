const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        crossOriginLoading: 'anonymous',
        path: path.resolve(__dirname, './dist'),
        filename: "js/bundle.js"
    },
    mode: isDev ? 'development' : 'production',
    devtool: isDev && 'source-map',
    devServer: {
        port: 3000,
        contentBase: path.join(__dirname, './src'),
        compress: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader"
            },
            {
                test: /\.(scss|css)$/,
                loaders: [
                    isDev ? {
                        loader: 'style-loader',
                        options: {
                            sourceMap: true
                        }
                    } : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: isDev
                        }
                    },
                    {
                        loader: "resolve-url-loader",
                        options: {
                            sourceMap: isDev
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: './assets/fonts/[name].[ext]'
                    }
                }]
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 8192,
                        fallback: 'file-loader',
                        name: './assets/img/[name].[ext]'
                    }
                }]
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, './src/index.html')
        }),
        new MiniCssExtractPlugin({
            filename: 'css/styles.css'
        })
    ]
};