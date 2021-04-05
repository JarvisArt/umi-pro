module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  rules: {
    '@typescript-eslint/no-use-before-define': 'off',
    'react-hooks/exhaustive-deps': 'off',
  },
};
