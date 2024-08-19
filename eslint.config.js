import importResolver from 'eslint-plugin-import'
import prettier from 'eslint-plugin-prettier'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import tseslint from 'typescript-eslint'

import { fixupPluginRules } from '@eslint/compat'

export default [
    { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
    { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
    { languageOptions: { globals: globals.browser } },
    ...tseslint.configs.recommended,
    {
        plugins: {
            'react-hooks': fixupPluginRules(reactHooks),
            'simple-import-sort': simpleImportSort,
            react: fixupPluginRules(react),
            import: fixupPluginRules(importResolver),
            prettier: prettier,
        },
        settings: {
            'import/resolver': {
                typescript: {},
            },
            react: {
                version: 'detect',
            },
        },
        rules: {
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [
                        ['^react', '^\\w'],
                        ['^src(/.*|$)', '^\\.'],
                        ['^[^.]'],
                    ],
                },
            ],
            'react/react-in-jsx-scope': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            'import/first': 'error',
            'import/newline-after-import': 'error',
            'import/no-duplicates': 'error',
            'sort-imports': [
                'error',
                {
                    ignoreCase: true,
                    ignoreDeclarationSort: true,
                    ignoreMemberSort: false,
                    memberSyntaxSortOrder: [
                        'none',
                        'all',
                        'multiple',
                        'single',
                    ],
                    allowSeparatedGroups: true,
                },
            ],
            'react/self-closing-comp': [
                'error',
                {
                    component: true,
                    html: false,
                },
            ],
        },
    },
    {
        ignores: ['dist/*'],
    },
]
