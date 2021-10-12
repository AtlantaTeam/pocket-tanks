import path from 'path';
import { Configuration } from 'webpack';
import nodeExternals from 'webpack-node-externals';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';

import { IS_DEV, DIST_DIR, SRC_DIR } from './env';
import { fileLoaders } from './loaders/fileLoaders';
import { cssLoaders } from './loaders/cssLoaders';
import { tsLoaders } from './loaders/tsLoaders';

const rootDir = process.cwd();

export const serverConfig: Configuration = {
    name: 'server',
    target: 'node',
    node: { __dirname: false },
    entry: path.join(rootDir, 'src/server'),
    module: {
        rules: [...fileLoaders.server, cssLoaders.server, tsLoaders.server],
    },
    output: {
        filename: 'server.js',
        libraryTarget: 'commonjs-module',
        path: path.join(rootDir, 'dist'),
        publicPath: '/',
    },
    resolve: {
        modules: ['src', 'node_modules'],
        extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx'],
        plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
    },

    devtool: 'source-map',

    performance: {
        hints: IS_DEV ? false : 'warning',
    },

    externals: [nodeExternals({ allowlist: [/\.(?!(?:tsx?|json)$).{1,5}$/i] })],

    optimization: { nodeEnv: false },
};
