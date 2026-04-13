import lightbox from '../src/index'

document.addEventListener('alpine:init', () => {
    const config = window.AlpineLightboxConfig
    const plugin = config ? lightbox.configure(config) : lightbox

    window.Alpine.plugin(plugin)
})
