import { default as js, default as pluginJs } from "@eslint/js";
import type { Linter } from "eslint";
import eslintConfigPrettier from 'eslint-config-prettier';
import { flatConfigs } from 'eslint-plugin-import';
import pluginPromise from 'eslint-plugin-promise';
import eslintPluginSecurity from 'eslint-plugin-security';
import sonarjs from 'eslint-plugin-sonarjs';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.node } },
  {
    rules: {
      'import/first': 'error',
      'import/no-duplicates': 'error',
      'promise/catch-or-return': 'error',
      'security/detect-object-injection': 'warn',
      'sonarjs/no-duplicate-string': 'warn',
      'no-unused-vars': 'off',
      'import/no-dynamic-require': 'warn',
      'import/no-nodejs-modules': 'warn',
      'import/no-unresolved': [
        'error',
        {
          commonjs: true,
          amd: true,
        },
      ],
    },
  },
  {
    settings: {
      'import/resolver': {
        typescript: {},
      },
    },
  },
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  flatConfigs.recommended,
  pluginPromise.configs['flat/recommended'],
  eslintPluginSecurity.configs.recommended,
  sonarjs.configs.recommended,
  eslintConfigPrettier,
  js.configs.recommended,
]satisfies Linter.Config[];
