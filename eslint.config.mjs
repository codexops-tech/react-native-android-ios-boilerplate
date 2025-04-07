import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import { defineConfig } from 'eslint/config';
import _import from 'eslint-plugin-import';
import noInlineStyles from 'eslint-plugin-no-inline-styles';
import prettier from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactNative from 'eslint-plugin-react-native';
import sortDestructureKeys from 'eslint-plugin-sort-destructure-keys';
import sortKeysFix from 'eslint-plugin-sort-keys-fix';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  allConfig: js.configs.all,
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default defineConfig([
  {
    extends: fixupConfigRules(
      compat.extends(
        '@react-native',
        'plugin:react-hooks/recommended',
        'plugin:react-native/all',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended'
      )
    ),
    languageOptions: {
      parser: tsParser,
    },

    plugins: {
      'eslint-plugin-prettier': prettier,

      'import': fixupPluginRules(_import),
      // "@typescript-eslint": typescriptEslint,
      'no-inline-styles': noInlineStyles,
      'react-hooks': fixupPluginRules(reactHooks),
      'react-native': fixupPluginRules(reactNative),
      'sort-destructure-keys': sortDestructureKeys,
      'sort-keys-fix': sortKeysFix,
    },

    rules: {
      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        {
          allowConciseArrowFunctionExpressionsStartingWithVoid: true,
          allowExpressions: true,
          allowHigherOrderFunctions: true,
          allowTypedFunctionExpressions: true,
        },
      ],
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-explicit-any': 'off',

      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-unused-expressions': [
        'warn',
        {
          allowShortCircuit: true,
          allowTaggedTemplates: true,
          allowTernary: true,
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-use-before-define': [
        'warn',
        {
          classes: false,
          functions: false,
          variables: true,
        },
      ],
      '@typescript-eslint/no-var-requires': ['warn'],
      'eslint-plugin-prettier/prettier': [
        'error',
        {
          arrowParens: 'avoid',
          bracketSameLine: true,
          bracketSpacing: true,
          quoteProps: 'consistent',
          singleQuote: true,
          tabWidth: 2,
          trailingComma: 'es5',
          useTabs: false,
        },
      ],

      'import/newline-after-import': [
        'warn',
        {
          count: 1,
        },
      ],

      'import/no-duplicates': 'error',
      'import/order': [
        'error',
        {
          'alphabetize': {
            caseInsensitive: true,
            order: 'asc',
          },

          'groups': [
            ['external', 'builtin'],
            'internal',
            ['sibling', 'parent'],
            'index',
          ],
          'newlines-between': 'always',

          'pathGroups': [
            {
              group: 'external',
              pattern: '@(react|react-native)',
              position: 'before',
            },
            {
              group: 'internal',
              pattern: '@miBoilerplate/**',
            },
            {
              group: 'internal',
              pattern: '@src/**',
            },
          ],

          'pathGroupsExcludedImportTypes': ['internal', 'react'],
        },
      ],

      'no-console': ['error'],

      'no-empty-pattern': 'off',

      'no-inline-styles/no-inline-styles': 2,
      'no-restricted-imports': [
        'error',
        {
          importNames: ['Text', 'Image'],
          message: 'Please use @app/blueprints for importing main elements.',
          name: 'react-native',
        },
      ],
      'no-shadow': 'off',
      'react-hooks/exhaustive-deps': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-native/no-inline-styles': 'off',
      'react-native/no-raw-text': 'off',
      'react-native/no-unused-styles': 'warn',
      'react-native/sort-styles': [
        'error',
        'asc',
        {
          ignoreStyleProperties: true,
        },
      ],
      'sort-destructure-keys/sort-destructure-keys': [
        2,
        {
          caseSensitive: false,
        },
      ],
      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
        },
      ],
      'sort-keys-fix/sort-keys-fix': [
        'error',
        'asc',
        {
          caseSensitive: false,
          natural: true,
        },
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js'],

    rules: {
      '@typescript-eslint/no-shadow': ['error'],
      'no-shadow': 'off',
      'no-undef': 'off',

      'react/no-unstable-nested-components': [
        'off',
        {
          allowAsProps: true,
        },
      ],
    },
  },
]);
