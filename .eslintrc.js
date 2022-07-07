module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    camelcase: 0,
    // 关闭大驼峰多单词检查
    'vue/multi-word-component-names': 'off',
    // 关闭未使用的变量提示
    'no-unused-vars': 'off',
    'vue/valid-template-root': 'off',
    'vue/no-mutating-props': 'off'
  }
}
