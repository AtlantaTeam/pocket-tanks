const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'source-map', // generate source map
    entry: {
        app: path.join(__dirname, 'src', 'index.tsx'),
    },
    target: 'web',
    resolve: {
        extensions: [
            '.ts',
            '.tsx',
            '.js',
        ],
        alias: {
            components: path.join(__dirname, 'src/components'),
            types: path.join(__dirname, 'src/types'),
            fonts: path.join(__dirname, 'src/styles/fonts'),
            utils: path.join(__dirname, 'src/utils'),
            assets: path.join(__dirname, 'static/assets'),
        },
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[fullhash].js',
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        hot: true,
        open: true,
        port: 9000,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                path: path.resolve(__dirname, './postcss.config.js'),
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]',
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]',
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: '**/*',
                    context: path.resolve(__dirname, 'static', 'assets'),
                    to: '.',
                },
            ],
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'static', 'index.html'),
        }),
        new MiniCssExtractPlugin({
            filename: 'css/style.[fullhash].css',
        }),
    ],
};
