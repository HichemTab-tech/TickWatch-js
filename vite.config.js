import { defineConfig } from 'vite';
import path from 'path';
import { terser } from 'rollup-plugin-terser';
import banner from 'vite-plugin-banner';

const bannerText = `/*
 * TickWatch-js v1.0.1
 * (c) HichemTech
 * Released under the MIT License.
 * Github: github.com/HichemTab-tech/TickWatch-js
 */
`;

const aliasesStrings = ['js', 'scss', 'images'];

const aliases = {};
aliasesStrings.forEach(alias => {
    aliases[`@${alias}`] = path.resolve(__dirname, `src/${alias}/`);
});

// noinspection JSUnusedGlobalSymbols
export default defineConfig(({ command }) => {
    const isProduction = command === 'build';

    return {
        build: {
            lib: {
                entry: path.resolve(__dirname, 'index.js'),
                name: 'TickWatch-js',
                fileName: (format) => `TickWatch${format === 'es' ? '' : '.min'}.js`,
                formats: ['umd'],
            },
            rollupOptions: {
                output: {
                    globals: {
                        this: 'this',
                    },
                },
                plugins: [
                    banner(bannerText),
                    isProduction && terser({
                        format: {
                            comments: false,
                        },
                    }),
                ],
            },
        },
        server: {
            port: 5001
        },
        resolve: {
            alias: {
                ...aliases
            }
        }
    };
});