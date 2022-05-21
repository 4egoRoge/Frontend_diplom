const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    resolve: {
        alias: {
            storePath: path.resolve(__dirname,"src/stores")
        }
    },
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "index-bundle.js"
    },
    devServer: {
        hot: true,
        port: 9001,
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    "css-loader", // translates CSS into CommonJS
                    {
                        loader: 'sass-loader',
                    },
                ]
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    "css-loader", // translates CSS into CommonJS
                    "postcss-loader",
                ]
            },
            {
                test: /\.(svg)$/,
                use: [{
                    loader: '@svgr/webpack',
                    options: {
                        svgoConfig: {
                            plugins: [{
                                name: 'removeViewBox',
                                active: false
                            }]
                        }
                    }
                }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'static/[name][ext]'
                }
            },
            {
                test: /\.(gif|png|jpe?g|webp)$/i,
                type: 'asset',
                generator: {
                    filename: 'static/[name][ext]'
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false,
        }),
    ]
};