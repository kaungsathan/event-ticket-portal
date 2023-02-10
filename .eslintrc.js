module.exports = {
    root: true,
    env: {
        node: true,
        'vue/setup-compiler-macros': true
    },
    extends: ['plugin:vue/vue3-essential', 'eslint:recommended', 'plugin:prettier/recommended'],
    parserOptions: {
        parser: '@babel/eslint-parser'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'vue/setup-compiler-macros': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/no-useless-template-attributes': 'off',
        'prettier/prettier': [
            'off',
            {
                semi: false
            }
        ]
    }
}
