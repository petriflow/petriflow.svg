# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres
to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Full Changelog: [https://github.com/petriflow/petriflow.svg/commits/v1.0.0](https://github.com/petriflow/petriflow.svg/commits/v1.0.0)


## [1.2.0](https://github.com/petriflow/petriflow.svg/releases/tag/v1.2.0) (2026-11-03)
### Added
 - `@netgrif/petriflow.svg`: optional CSS custom properties `--petriflow-svg-canvas-background`, `--petriflow-svg-grid-color`,
   `--petriflow-svg-element-fill`, `--petriflow-svg-element-stroke` and `--petriflow-svg-text-color` for theming the canvas
   and the Petri net elements, e.g. a dark canvas (defaults unchanged: original white / black / `GridConfiguration.stroke`)
   (the variables have no specificity, state classes of the application such as the simulation colors win)
 - `@netgrif/petriflow.svg`: `--petriflow-svg-icon-font` for the transition icons, default Material Symbols Rounded / Outlined
   with fallback to Material Icons (applications on Material 3 load only Material Symbols)
 - Example application: light / dark mode toggle (follows the OS preference by default), dark canvas with a white grid
 - Example application: tooltips describing every tool of the toolbar
 - Example application: the canvas can be moved by dragging the empty canvas in select and move mode
   and with the middle mouse button in every mode (not only in panning mode)
 - `lint` and `example:lint` npm scripts
### Changed
 - Upgraded from Angular 13 to Angular 22 (TypeScript 6.0, RxJS 7.8, zone.js 0.16)
 - `@netgrif/petriflow.svg` is built with `@angular/build:ng-packagr` (partial Ivy, APF); tests run with `@angular/build:karma`
 - Example application is built with `@angular/build:application` / `@angular/build:dev-server` (esbuild)
 - Example application theme migrated from Material 2 to Material 3 (Netgrif brand palettes, `--mat-sys-*` tokens,
   light / dark color scheme); the canvas classes (`svg-active-*`, `svg-inactive-*`, `svg-transition-*`, ...) use system tokens
 - `@angular/flex-layout` replaced by `@ngbracket/ngx-layout` in the example application
 - ESLint 9 flat config (`eslint.config.mjs`) with `angular-eslint` 22 and `typescript-eslint` 8 replaces the `.eslintrc.json` files
 - `@netgrif/petri.svg` build tooling: rollup 4, `@rollup/plugin-terser`, `rollup-plugin-dts` 6, jest 30
 - `@netgrif/petri.svg`: the distributed `package.json` no longer contains `devDependencies`
 - Unit test coverage is reported by `karma-coverage` (lcov / html / json-summary in `coverage/<project>`), Chrome from puppeteer 25
### Removed
 - `@netgrif/petriflow.svg`: unused peer dependencies (Angular Material / CDK / Forms / Router / Animations,
   flex-layout, moment, ngx-translate, quill, monaco, hammerjs, ...); only `@angular/core`, `@angular/common`,
   `@netgrif/petri.svg` and `@panzoom/panzoom` are required now
 - Stray `sonar-scanner-analysis.js` script (copied from another project) from the example application
 - Unused dependencies of the workspace (`@angular/animations`, `@angular/platform-browser-dynamic`, moment, ngx-translate,
   quill, monaco, hammerjs, browserify, codelyzer, protractor, ts-node, `sonarqube-scanner`, `karma-firefox-launcher`,
   `karma-mocha-reporter`, `karma-coverage-istanbul-reporter`, `eslint-plugin-import`, `eslint-plugin-eslint-comments`,
   `rollup-plugin-copy`, ...)
 - Protractor e2e tests and `test.ts` test entry points (the test environment is initialized by the karma builder)
### Fixed
 - Peer dependency ranges of `@netgrif/petriflow.svg` (`npm install` no longer needs `--legacy-peer-deps`)
### Security
 - Dev tooling upgrades resolve all critical / high `npm audit` findings (puppeteer, ESLint, sonarqube-scanner, ...)

<!-- Template
## [version](https://github.com/petriflow/petriflow.svg/releases/tag/v) (YYYY-MM-dd)
### Added
 - for new features.
### Changed
 - for changes in existing functionality.
### Deprecated
 - for soon-to-be removed features.
### Removed
 - for now removed features.
### Fixed
 - for any bug fixes.
### Security
 - in case of vulnerabilities.
-->
