/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './src/**/*.html',
    ],
    theme: {
        screens: {
            'sm': '640px',
            'md': '768px',
            'lg': '1280px',
            'xl': '1280px',
        },
    },
}

