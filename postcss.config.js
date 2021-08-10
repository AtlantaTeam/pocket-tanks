module.exports = {
    plugins: [
        require('postcss-import'),
        require('postcss-nested'),
        require('autoprefixer'),
        require('precss'),
        require('cssnano')({
            preset: 'default',
        })
    ],
};
