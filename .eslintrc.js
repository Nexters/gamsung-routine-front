module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  extends: [
    '@react-native-community',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'import', 'unused-imports', 'react-hooks'],
  root: true,
  ignorePatterns: ['.eslintrc.js'],
  // 0 = off, 1 = warning, 2 = error (you passed "3")
  rules: {
    'react/jsx-key': 2,
    'react/jsx-no-target-blank': [0, { enforceDynamicLinks: 'always' }],
    'react/prop-types': 0,
    semi: 0,
    'import/no-unresolved': 0,
    'import/no-named-as-default': 0,
    'import/order': [
      2,
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'no-unused-vars': 0, // or "@typescript-eslint/no-unused-vars": "off",
    'unused-imports/no-unused-imports': 2,
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/naming-convention': 0,
    'import/namespace': 0,
    'react/display-name': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        paths: 'src',
      },
    },
  },
};
