buildPlugin({
    entryPoints: ['builds/cdn.js'],
    outfile: 'dist/alpine-tailwind-lightbox.min.js',
})

buildPlugin({
    entryPoints: ['builds/module.js'],
    outfile: 'dist/alpine-tailwind-lightbox.esm.js',
    platform: 'neutral',
    mainFields: ['main', 'module'],
})

function buildPlugin(buildOptions) {
    return require('esbuild').buildSync({
        ...buildOptions,
        minify: true,
        bundle: true,
        loader: {
            '.html': 'text',
        },
    })
}
