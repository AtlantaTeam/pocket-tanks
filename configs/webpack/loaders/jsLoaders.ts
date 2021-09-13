const fileRegex = /\.ts(x?)$/;

export const jsLoaders = {
    client: {
        test: fileRegex,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
    },
    server: {
        test: fileRegex,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
    },
};
