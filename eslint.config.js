import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import featureSliced from '@feature-sliced/eslint-config'
import { globalIgnores } from 'eslint/config'

export default [
    globalIgnores(['dist', 'build', 'coverage', 'node_modules']),
    js.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    {
        plugins: {
            'react-hooks': reactHooks,
        },
        rules: reactHooks.configs.recommended.rules,
    },

    {
        plugins: {
            'react-refresh': reactRefresh,
        },
        rules: {
            'react-refresh/only-export-components': 'warn',
        },
    },

    featureSliced,
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            parserOptions: {
                project: './tsconfig.json',
            },
        },
        settings: {
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true,
                    project: './tsconfig.json',
                },
            },
        },

        rules: {
            '@typescript-eslint/consistent-type-imports': 'error',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                },
            ],
        },
    },
]
