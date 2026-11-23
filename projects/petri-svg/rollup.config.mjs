import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import dts from 'rollup-plugin-dts';
import del from "rollup-plugin-delete"
import {copyFileSync, mkdirSync, readFileSync, writeFileSync} from "node:fs";
import {basename} from "node:path";

const dist = "../../dist/petri-svg"

/**
 * Copies package metadata files next to the bundles (replaces rollup-plugin-copy).
 * The build tooling (devDependencies) is left out of the distributed package.json, otherwise
 * `npm i ./dist/petri-svg` (local link) installs jest & co. into the workspace.
 */
const copy = (files, dest) => ({
    name: 'copy-files',
    writeBundle() {
        mkdirSync(dest, {recursive: true});
        files.forEach(file => {
            const target = `${dest}/${basename(file)}`;
            if (basename(file) === 'package.json') {
                const {devDependencies, ...manifest} = JSON.parse(readFileSync(file, 'utf8'));
                writeFileSync(target, JSON.stringify(manifest, null, 4) + '\n');
            } else {
                copyFileSync(file, target);
            }
        });
    }
});

export default [
    {
        input: './src/lib/index.ts',
        output: [{
            file: dist + '/petri.svg.esm.js',
            format: 'esm',
            sourcemap: true
        }],
        plugins: [
            typescript({
                tsconfig: './tsconfig.lib.esm.json',
                outDir: dist
            }),
            terser()
        ]
    },
    {
        input: './src/lib/index.ts',
        output: [{
            file: dist + '/petri.svg.js',
            format: 'cjs',
            sourcemap: true
        }],
        plugins: [
            typescript({
                tsconfig: './tsconfig.lib.json',
                outDir: dist
            }),
            terser(),
            copy(["./package.json", "./README.md", "./LICENSE.txt", "../../CHANGELOG.md"], dist)
        ]
    },
    {
        input: dist + '/dts/index.d.ts',
        output: [{
            file: dist + '/petri.svg.d.ts',
            format: 'es'
        }],
        plugins: [
            dts(),
            del({
                targets: dist + '/dts',
                hook: 'buildEnd',
                force: true
            })
        ]
    }
]
