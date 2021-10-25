
const path = require('path');
const webpack = require('webpack');
const custom = require('../storybook.webpack.config');


module.exports = {
    stories: [
        '../src/**/*.stories.mdx',
        '../src/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    // https://storybook.js.org/docs/react/configure/typescript
    typescript: {
        check: false,
        checkOptions: {},
        reactDocgen: 'react-docgen-typescript',
        reactDocgenTypescriptOptions: {
          shouldExtractLiteralValuesFromEnum: true,
          propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
        },
      },
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
            include: path.resolve(__dirname, '../src/components'),

            loader: require.resolve(
                '@storybook/source-loader',
            ),
            options: { parser: 'typescript' },
            enforce: 'pre',
        });

        config.module.rules.push({
            test: /\.tsx?$/,
            include: path.resolve(__dirname, '../src/components'),
            use: [
                require.resolve('babel-loader'),
            ],
        });

        config.module.rules.push({
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            type: 'asset/resource',
            generator: {
                filename: 'fonts/[name][ext]',
            },
        });

        config.module.rules.push({
            test: /\.(mp3|wav)$/i,
            type: 'asset/resource',
            generator: {
                filename: 'audio/[name][ext]',
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
