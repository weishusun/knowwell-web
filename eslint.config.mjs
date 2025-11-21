import eslintConfigNext from 'eslint-config-next';

export default [
  {
    ignores: ['node_modules', '.next', 'dist']
  },
  ...eslintConfigNext,
  {
    rules: {
      'react/jsx-key': 'off'
    }
  }
];
