module.exports = {
    root: true,
    env: {
      browser: true,
      node: true,
      es6: true,
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
      parser: '@typescript-eslint/parser',
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    extends: [
      'plugin:vue/vue3-recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
      'plugin:prettier/recommended',
      'plugin:jest/recommended',
    ],
    rules: {
      'vue/script-setup-uses-vars': 'error',
      'no-use-before-define': 'off',
    },
}