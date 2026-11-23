# Petriflow.SVG

[![GitHub](https://img.shields.io/github/license/petriflow/petriflow.svg)](https://www.apache.org/licenses/LICENSE-2.0)
[![npm dev dependency version (scoped)](https://img.shields.io/npm/dependency-version/@netgrif/petriflow.svg/dev/typescript?label=Typescript)](https://www.typescriptlang.org/)
[![Petriflow 1.0.1](https://img.shields.io/badge/Petriflow-1.0.1-0aa8ff)](https://petriflow.com)
[![npm (scoped)](https://img.shields.io/npm/v/@netgrif/petriflow.svg)](https://www.npmjs.com/package/@netgrif/petriflow.svg)
[![npm](https://img.shields.io/npm/dt/@netgrif/petriflow.svg)](https://www.npmjs.com/package/@netgrif/petriflow.svg)
[![build](https://github.com/petriflow/petriflow.svg/actions/workflows/master-build.yml/badge.svg)](https://github.com/petriflow/petriflow.svg/actions/workflows/release-build.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=petriflow_petriflow.svg&metric=alert_status)](https://sonarcloud.io/dashboard?id=petriflow_petriflow.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/petriflow/petriflow.svg/badge.svg)](https://snyk.io/test/github/petriflow/petriflow.svg)

> Visual library for Petriflow objects

Petriflow.SVG is a Angular library for visual representation of Petriflow objects. The library is for rendering and
modeling
Petriflow objects as SVG elements.
The library offers component that is functionally container for SVG objects. Within the component a user can draw/model
a Petriflow process.
The library is updated together with the Petriflow specification to ensure up-to-date compatibility.

Full specification of Petriflow low-code language can be found at [Petriflow.com](https://petriflow.com)

The library is based on the library Petri.SVG that is also developed in this project (folder projects/petri-svg).
Petri.SVG is pure Typescript library of visual representation (SVG elements) of Petri Nets components.
For more information see [Petri.SVG](../../projects/petri-svg).

## Install

First, make sure you have installed the latest version of Node.js and npm with it (You may need to restart your computer
after this step).

You can install it with the following command:

```shell
npm install --save @netgrif/petriflow.svg
```

### Requirements

As the library is an Angular library the main dependency is Angular 22 and its modules.
For more information about dependencies see [the library package.json](../../projects/petriflow-svg/package.json).

Since npm v7+ does not install peer dependencies you need to install them yourself. Please
see `peerDependencies` attribute in [the library package.json](../../projects/petriflow-svg/package.json).

## Usage

The library publishes Angular component `petriflow-svg-canvas` that represent drawing canvas for SVG objects.
The component does not have any inputs or
output. [See documentation for more information.](https://petriflow.github.io/petriflow.svg)

### Theming

The canvas and the Petri net elements can follow the application theme (e.g. light / dark mode) through optional
CSS custom properties. Without them the original colors are used.

```scss
petriflow-svg-canvas {
    --petriflow-svg-canvas-background: light-dark(#ffffff, #14181c);         // default: white
    --petriflow-svg-grid-color: light-dark(#cccccc, rgba(255, 255, 255, .22)); // default: GridConfiguration.stroke
    --petriflow-svg-element-fill: light-dark(#ffffff, #14181c);              // place / transition / label background, default: white
    --petriflow-svg-element-stroke: light-dark(#000000, #ffffff);            // place / transition / arc line, default: black
    --petriflow-svg-text-color: light-dark(#000000, #ffffff);                // labels, default: black
    --petriflow-svg-icon-font: 'Material Symbols Rounded';                   // transition icons, default: Material Symbols Rounded / Outlined, Material Icons
}
```

`@netgrif/petri.svg` draws the elements with SVG presentation attributes (`fill="white"`, `stroke="black"`), the canvas
component overrides them with these properties, so no change of the drawing API is needed.

The state colors of the Petri net elements are set by the global CSS classes `svg-active-stroke`, `svg-active-fill`,
`svg-inactive-stroke`, `svg-inactive-fill`, `svg-transition-enabled`, ... defined by the application
(see the example application theme).

## Reporting issues

If you find a bug, let us know. First, please read
our [Contribution guide](https://github.com/petriflow/petriflow.js/blob/master/CONTRIBUTING.md)

## License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use these files except in compliance with
the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "
AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
either express or implied. See the License for the specific language governing permissions and limitations under the
License.
