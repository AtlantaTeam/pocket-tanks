import { IS_DEV } from '../env';

const fileRegex = /\.tsx?$/;

export const tsLoaders = {
    client: {
        test: fileRegex,
        exclude: /node_modules|server/,
        use: [
            IS_DEV && {
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    plugins: [
                        'react-hot-loader/babel',
                    ],
                },
            },
            {
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                },
            },
        ].filter(Boolean) as any,
    },
    server: {
        test: fileRegex,
        exclude: /node_modules/,
        use: {
            loader: 'ts-loader',
            options: {
                transpileOnly: true,
            },
        },
    },
};
