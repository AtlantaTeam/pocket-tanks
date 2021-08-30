
const path = require('path');
const webpack = require('webpack');
const custom = require('../webpack.config.js');

module.exports = {
    stories: [
        '../src/**/*.stories.mdx',
        '../src/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-actions',
        '@storybook/addon-links',
        '@storybook/addon-knobs',
        '@storybook/addon-storysource',
        'storybook-addon-react-docgen/register',
        {
            name: '@storybook/addon-docs',
            options: {
                configureJSX: true,
                babelOptions: {},
                sourceLoaderOptions: null,
            },
        },
        {
            name: '@storybook/addon-postcss',
            options: {
                cssLoaderOptions: {
                    // When you have splitted your css over multiple files
                    // and use @import('./other-styles.css')
                    importLoaders: 1,
                },
                postcssLoaderOptions: {
                    implementation: require('postcss'),
                },
            },
        },
    ],
    core: {
        builder: 'webpack5',
    },

    webpackFinal: (config) => {
        config.plugins.push(
            new webpack.HotModuleReplacementPlugin(),
        );

        config.module.rules.push({
            test: /\.stories\.tsx$/,
            loader: require.resolve(
                '@storybook/source-loader',
            ),
            options: { parser: 'typescript' },
            enforce: 'pre',
        });

        config.module.rules.push({
            test: /\.tsx?$/,
            include: path.resolve(__dirname, '../src'),
            use: [
                require.resolve('babel-loader'),
                {
                    loader: require.resolve(
                        'react-docgen-typescript-loader',
                    ),
                    options: {
                        // Provide the path to your tsconfig.json so that your stories can
                        // display types from outside each individual story.
                        tsconfigPath: path.resolve(
                            __dirname,
                            '../tsconfig.json',
                        ),
                    },
                },
            ],
        });

        config.module.rules.push({
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            type: 'asset/resource',
            generator: {
                filename: 'fonts/[name][ext]',
            },
        });

        // 2b. Run `source-loader` on story files to show their source code
        // automatically in `DocsPage` or the `Source` doc block.
        config.module.rules.push({
            test: /\.(stories|story)\.[tj]sx?$/,
            loader: require.resolve(
                '@storybook/source-loader',
            ),
            exclude: [
                /node_modules/,
            ],
            enforce: 'pre',
        });

        return {
            ...config,
            resolve: custom.resolve,
            module: {
                ...config.module,
                rules: [
                    ...config.module.rules,
                ],
            },
        };
    },
};
