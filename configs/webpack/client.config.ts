import path from 'path';
import webpack, { Configuration, Entry } from 'webpack';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

import Dotenv from 'dotenv-webpack';
import {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    IS_DEV,
    SRC_DIR,
    STATIC_DIR,
    YANDEX_CLIENT_ID,
    YANDEX_CLIENT_SECRET,
} from './env';

import { fileLoaders } from './loaders/fileLoaders';
import { cssLoaders } from './loaders/cssLoaders';
import { tsLoaders } from './loaders/tsLoaders';

const rootDir = process.cwd();

export const clientConfig: Configuration = {
    target: 'web',
    entry: ([
        IS_DEV && 'react-hot-loader/patch',
        // Entry для работы HMR
        IS_DEV && 'webpack-hot-middleware/client',
        IS_DEV && 'css-hot-loader/hotModuleReplacement',
        path.resolve(rootDir, 'src/index'),
    ].filter(Boolean) as unknown) as Entry,
    module: {
        rules: [...fileLoaders.client, cssLoaders.client, tsLoaders.client],
    },
    output: {
        path: path.join(rootDir, 'dist'),
        publicPath: '/',
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
            audio: path.join(STATIC_DIR, 'audio'),
        },
        extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx'],
        plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
    },
    plugins: [
        new Dotenv({
            path: IS_DEV ? 'stage/env/dev.env' : '', // deploy_files/prod.env
        }),
        new webpack.EnvironmentPlugin({
            NODE_ENV: IS_DEV ? 'development' : 'production', // use 'development' unless process.env.NODE_ENV is defined
            GOOGLE_CLIENT_ID: GOOGLE_CLIENT_ID || '',
            GOOGLE_CLIENT_SECRET: GOOGLE_CLIENT_SECRET || '',
            YANDEX_CLIENT_ID: YANDEX_CLIENT_ID || '',
            YANDEX_CLIENT_SECRET: YANDEX_CLIENT_SECRET || '',
        }),
        new MiniCssExtractPlugin({
            filename: 'css/style.css',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: '**/*',
                    context: path.join(STATIC_DIR, 'images/favicon'),
                    to: '.',
                },
                {
                    from: path.join(STATIC_DIR, 'assets/robots.txt'),
                    to: '.',
                },
            ],
        }),
        // Plugin для HMR
        IS_DEV && (new webpack.HotModuleReplacementPlugin()),
    ].filter(Boolean) as any,

    devtool: 'source-map',

    performance: {
        hints: IS_DEV ? false : 'warning',
    },
};
