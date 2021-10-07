import { RuleSetRule } from 'webpack';

export const fileLoaders = {
    client: [
        {
            test: /\.(png|jpe?g|gif|svg|ico)$/i,
            type: 'asset/resource',
            generator: {
                filename: 'images/[name][ext]',
            },
        } as RuleSetRule,
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            type: 'asset/resource',
            generator: {
                filename: 'fonts/[name][ext]',
            },
        } as RuleSetRule,
    ],
    server: [
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            type: 'asset/resource',
            generator: {
                filename: 'fonts/[name][ext]',
            },
        },
        {
            test: /\.(png|jpe?g|gif|svg|ico)$/i,
            type: 'asset/resource',
            generator: {
                filename: 'images/[name][ext]',
            },
        },
    ],
};
