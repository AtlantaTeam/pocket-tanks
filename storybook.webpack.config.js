const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'source-map', // generate source map
    entry: {
        app: path.join(__dirname, 'src', 'index.tsx'),
    },
    target: 'web',
    resolve: {
        extensions: [
            '.ts',
            '.tsx',
            '.js',
        ],
        alias: {
            components: path.join(__dirname, 'src/components'),
            types: path.join(__dirname, 'src/types'),
            fonts: path.join(__dirname, 'src/styles/fonts'),
            utils: path.join(__dirname, 'src/utils'),
            constants: path.join(__dirname, 'src/constants'),
            assets: path.join(__dirname, 'static/assets'),
            images: path.join(__dirname, 'static/images'),
        },
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[fullhash].js',
    },
};
