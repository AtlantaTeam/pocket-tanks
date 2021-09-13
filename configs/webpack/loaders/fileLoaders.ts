const fileRegex = /^(?!.*\.inline).*\.(svg|jpe?g|png|gif|eot|woff2?|ttf)$/;

export const fileLoaders = {
    client: [
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
    server: {
        loader: 'null-loader',
        test: fileRegex,
    },
};
