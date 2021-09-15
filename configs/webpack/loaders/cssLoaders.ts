import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { RuleSetRule } from 'webpack';

import { IS_DEV } from '../env';

const loaders = [
    IS_DEV && 'css-hot-loader',
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
];

export const cssLoaders = {
    client: {
        test: /\.css$/,
        use: loaders,
    } as RuleSetRule,
    server: {
        test: /\.css$/,
        loader: 'null-loader',
    } as RuleSetRule,
};
