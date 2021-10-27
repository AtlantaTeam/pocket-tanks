import path from 'path';
import webpack, { Configuration, Entry } from 'webpack';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { IS_DEV, SRC_DIR, STATIC_DIR } from './env';

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
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: IS_DEV ? '"development"' : '"production"',
            },
        }),
        new MiniCssExtractPlugin({
            filename: 'css/style.css',
        }),
        // Plugin для HMR
        IS_DEV && (new webpack.HotModuleReplacementPlugin()),
    ].filter(Boolean) as any,

    devtool: 'source-map',

    performance: {
        hints: IS_DEV ? false : 'warning',
    },
};
