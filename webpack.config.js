const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { SourceMapDevToolPlugin } = require("webpack");
// const ImageminPlugin = require("imagemin-webpack-plugin")

// переменная чтобы писать условия в какой среде разработки выполняется условие: dev или prod
const production = process.env.NODE_ENV === 'production';
const development = process.env.NODE_ENV === 'development';

module.exports = {
    //путь откуда
    entry: { myAppName: path.resolve(__dirname, "./src/index.js") },
    // путь куда
    output: {
        path: path.resolve(__dirname, "./dist"),
        // с каждым новым билдом будет добавляться хеш контента, для скорости загрузки
        filename: production ? '[name].[contenthash].js' : '[name].js',
        sourceMapFilename: "[name].js.map"
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                // правило для основных файлов
                test: /\.(js|jsx)$/,
                // куда не нужно лезть
                exclude: /node_modules/,
                // принимает массив лоадеров
                use: ["babel-loader", "source-map-loader"],
            },
            {
                // для стилей
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                        },
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.(jpg|jpeg|png|webp)$/,
                exclude: /node_modules/,
                type: 'asset/resource',
                generator: {
                    filename: './img/[name][ext]'
                }
            }
        ],
    },
    // можно не дописывать окончания
    resolve: {
        extensions: ["*", ".js", ".jsx", ".css"],
    },
    plugins: [
        // очищает старое
        new CleanWebpackPlugin(),
        // заменяет только тот код который отредактировали при новом билде
        new webpack.HotModuleReplacementPlugin(),
        // создаст в .dist основной файл html и свяжет основной скрипт с ним
        new HtmlWebpackPlugin({
            title: "Любанин проект",
            template: "./public/index.html",
            favicon: "./favicon.ico"
        }),
        // создаст единый css файл со стилями
        new MiniCssExtractPlugin({
            filename: production ? '[name].[contenthash].css' : '[name].css',
        }),
        new SourceMapDevToolPlugin({
            filename: "[file].map"
        })
    ],
    //параметры для сервера
    devServer: {
        historyApiFallback: true,
        port: 3000,
        hot: development,
    },
    performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
};