module.exports = {
    testMatch: ['**/spec/**/*.spec.js'],
    testEnvironment: 'jsdom',
    roots: [
        '<rootDir>/src/',
        '<rootDir>/static/',
    ],
    modulePaths: [
        '<rootDir>',
        '<rootDir>/src',
        '<rootDir>/static',
    ],
    setupFiles: [
        '<rootDir>/configs/enzyme',
        '<rootDir>/configs/runtime',
        '<rootDir>/configs/jestPromiseRejections',
    ],
    coverageDirectory: '<rootDir>/coverage',
    coveragePathIgnorePatterns: [
        '<rootDir>/static',
        '<rootDir>/configs',
        '<rootDir>/.storybook',
        '<rootDir>/.husky',
    ],
    moduleNameMapper: {
        '^.+\\.css$': 'identity-obj-proxy',
    },
    transform: {
        '^.+\\.(js|ts)x?$': 'babel-jest',
        '\\.(svg|jpg)$': '<rootDir>/configs/fileTransformer.js',
    },
};
