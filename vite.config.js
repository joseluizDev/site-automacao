import svgr from '@svgr/rollup';
import react from '@vitejs/plugin-react';
import fs from 'fs/promises';
import { resolve } from 'path';
import { defineConfig } from 'vite';
// import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            src: resolve(__dirname, 'src'),
        },
    },
    esbuild: {
        loader: {
            'js': 'jsx',
            'js': 'js',
            'jsx': 'jsx',
            'ts': 'ts',
            'tsx': 'tsx',
            'json': 'json',
            'css': 'css',
            'less': 'less',
            'sass': 'sass',
            'scss': 'scss',
        },
        include: /src\/.*\.jsx?$/,
        exclude: [],
    },
    optimizeDeps: {
        esbuildOptions: {
            plugins: [
                {
                    name: 'load-js-files-as-jsx',
                    setup(build) {
                        build.onLoad(
                            { filter: /src\\.*\.js$/ },
                            async (args) => ({
                                loader: 'jsx',
                                contents: await fs.readFile(args.path, 'utf8'),
                            })
                        );
                    },
                },
            ],
        },
    },



    // plugins: [react(),svgr({
    //   exportAsDefault: true
    // })],

    plugins: [svgr(), react()],
});
