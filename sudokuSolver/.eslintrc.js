module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
    node: true,
  },
  plugins: [
    'chai-friendly',
  ],
  extends: [
    'airbnb-base',
    'plugin:chai-friendly/recommended',
  ],
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    'chai-friendly/no-unused-expressions': 2,
    'no-console': 'off',
    'no-plusplus': [2, { allowForLoopAfterthoughts: true }],
  },
  overrides: [
  ],
};
