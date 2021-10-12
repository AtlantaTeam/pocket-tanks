module.exports = {
    plugins: [
        "@typescript-eslint",
        "eslint-comments",
        "jest",
        "promise",
    ],
    extends: [
        "airbnb-typescript",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:eslint-comments/recommended",
        "plugin:jest/recommended",
        "plugin:promise/recommended",
    ],
    env: {
        node: true,
        browser: true,
        jest: true,
    },
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        project: "./tsconfig.json",
    },
    rules: {
        // Indent with 4 spaces
        "indent": ["error", 4, {"SwitchCase": 1}],
        'max-len': ['error', {
            code: 120,
            comments: 120,
        }],
        '@typescript-eslint/indent': ["error", 4],
        // Indent JSX with 4 spaces
        "react/jsx-indent": ["error", 4],
        // Indent props with 4 spaces
        "react/jsx-indent-props": ["error", 4],
        "quotes": ["error", "single"],
        "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
        "import/no-extraneous-dependencies": ["error", {"devDependencies": true, "optionalDependencies": false, "peerDependencies": false}],
        // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
        "no-prototype-builtins": "off",
        // https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
        "import/prefer-default-export": "off",
        // Too restrictive: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
        "react/destructuring-assignment": "off",
        // No jsx extension: https://github.com/facebook/create-react-app/issues/87#issuecomment-234627904
        "react/jsx-filename-extension": "off",
        // https://stackoverflow.com/questions/63818415/react-was-used-before-it-was-defined/64024916#64024916
        "no-use-before-define": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        // Allow most functions to rely on type inference. If the function is exported, then `@typescript-eslint/explicit-module-boundary-types` will ensure it's typed.
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-use-before-define": [
            "error",
            { functions: false, classes: true, variables: true, typedefs: true },
        ],
        "class-methods-use-this": "off",
        //
        "@typescript-eslint/no-unsafe-call" : "off",
        "@typescript-eslint/no-unsafe-member-access" : "off",
        "promise/catch-or-return" : "off",
    },
    ignorePatterns: ['*.config.js', '*.js', '**/*/stories']
};
