module.exports = {
    'plugins': [
        'cypress'
    ],
    'env': {
        'cypress/globals': true,
        'browser': true,
        'es2021': true,
        'node': true
    },
    'extends': ['eslint:recommended', 'plugin:cypress/recommended'],
    'overrides': [
        {
            'env': {
                'node': true
            },
            'files': [
                '.eslintrc.{js,cjs}'
            ],
            'parserOptions': {
                'sourceType': 'script'
            }
        }
    ],
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        'import/no-named-as-default': 'off',
        'no-unused-vars': ['warn'],
        'no-multiple-empty-lines': [
            'error', { 'max': 1, 'maxEOF': 1 }
        ]
    }
};
