import path from 'path';
import webpack, { Configuration, Entry } from 'webpack';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

import {
    IS_DEV, DIST_DIR, SRC_DIR, STATIC_DIR,
} from './env';

import { fileLoaders } from './loaders/fileLoaders';
import { cssLoaders } from './loaders/cssLoaders';
import { jsLoaders } from './loaders/jsLoaders';

export const clientConfig: Configuration = {
    target: 'web',
    entry: ([
        IS_DEV && 'react-hot-loader/patch',
        // Entry для работы HMR
        IS_DEV && 'webpack-hot-middleware/client',
        IS_DEV && 'css-hot-loader/hotModuleReplacement',
        path.join(SRC_DIR, 'index'),
    ].filter(Boolean) as unknown) as Entry,
    module: {
        rules: [...fileLoaders.client, jsLoaders.client, cssLoaders.client],
    },
    output: {
        path: DIST_DIR,
        filename: 'bundle.[fullhash].js',
    },
    resolve: {
        modules: [SRC_DIR, 'node_modules'],
        alias: {
            'react-dom': '@hot-loader/react-dom',
            components: path.join(SRC_DIR, 'components'),
            types: path.join(SRC_DIR, 'types'),
            fonts: path.join(SRC_DIR, 'styles/fonts'),
            utils: path.join(SRC_DIR, 'utils'),
            assets: path.join(STATIC_DIR, 'assets'),
            images: path.join(STATIC_DIR, 'images'),
        },
        extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx'],
        plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: '**/*',
                    context: path.resolve(STATIC_DIR, 'assets'),
                    to: '.',
                },
            ],
        }),
        new HtmlWebpackPlugin({
            template: path.join(STATIC_DIR, 'index.html'),
        }),
        new MiniCssExtractPlugin({
            filename: 'css/style.[fullhash].css',
        }),
        // Plugin для HMR
        new webpack.HotModuleReplacementPlugin(),
    ].filter(Boolean),

    devtool: 'source-map',

    performance: {
        hints: IS_DEV ? false : 'warning',
    },
};
