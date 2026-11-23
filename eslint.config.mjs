// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';

/**
 * Flat config equivalent of the former .eslintrc.json files (root, petri-svg, petriflow-svg).
 *
 * Works the same from the repository root (npm lint scripts, CI) and from an IDE / any working directory:
 * file globs are resolved relative to this file and no type-aware parsing (`parserOptions.project`)
 * is used, so there are no tsconfig paths that would depend on the current working directory.
 * If a type-aware rule is ever needed, use `parserOptions: {projectService: true, tsconfigRootDir: import.meta.dirname}`.
 */
const selectorRules = (prefix) => ({
    '@angular-eslint/directive-selector': ['error', {type: 'attribute', prefix, style: 'camelCase'}],
    '@angular-eslint/component-selector': ['error', {type: 'element', prefix, style: 'kebab-case'}],
});

const angularProjects = ['petriflow-svg', 'example-app'];

export default tseslint.config(
    {
        ignores: [
            '**/node_modules/**',
            'dist/**',
            'coverage/**',
            '**/coverage/**',
            'docs/**',
            '**/docs/**',
            '.angular/**',
            '**/*.js',
            '**/*.mjs',
        ],
    },
    {
        linterOptions: {
            // replaces eslint-plugin-eslint-comments/no-unused-disable
            reportUnusedDisableDirectives: 'error',
        },
    },

    // petri.svg - plain TypeScript library (no Angular)
    {
        files: ['projects/petri-svg/**/*.ts'],
        extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
        rules: {
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            'sort-imports': ['error', {ignoreDeclarationSort: true, ignoreCase: true}],
        },
    },

    // Angular projects (petriflow.svg library, example application)
    {
        files: angularProjects.map(project => `projects/${project}/**/*.ts`),
        languageOptions: {
            parser: tseslint.parser,
        },
        extends: [...angular.configs.tsRecommended],
        processor: angular.processInlineTemplates,
        rules: {
            // added to the recommended set after angular-eslint 17, would require large refactors
            '@angular-eslint/prefer-inject': 'off',
            '@angular-eslint/prefer-standalone': 'off',
            '@angular-eslint/prefer-on-push-component-change-detection': 'off',
        },
    },
    {
        files: ['projects/petriflow-svg/**/*.ts'],
        rules: selectorRules('petriflow-svg'),
    },
    {
        files: ['projects/example-app/**/*.ts'],
        rules: selectorRules('pf-app'),
    },
    {
        files: angularProjects.map(project => `projects/${project}/**/*.html`),
        extends: [...angular.configs.templateRecommended],
        rules: {
            // remaining *ngIf / *ngFor templates, to be migrated to @if / @for
            '@angular-eslint/template/prefer-control-flow': 'warn',
        },
    },
);
