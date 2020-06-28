module.exports = {
  env: {
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
  },
  overrides: [
    {
      files: [
        'server.js',
        'routes/api.js',
        'tests/2_functional-tests.js',
        'db/*.js',
      ],
    },
  ],
};
