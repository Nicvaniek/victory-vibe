/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
    },
    plugins: [require('daisyui')],

    // daisyUI config (optional - here are the default values)
    daisyui: {
        themes: [
            'cupcake',
            {
                rugbyWorldCup2023: {
                    primary: '#2d3cff',
                    secondary: '#19194b',
                    accent: '#ff3000',
                    neutral: '#191d29',
                    'base-100': '#ffffff',
                    info: '#3b7be3',
                    success: '#1fd677',
                    warning: '#bf9b0d',
                    error: '#f6132d',
                },
            },
        ],
        darkTheme: 'dark', // name of one of the included themes for dark mode
        base: true, // applies background color and foreground color for root element by default
        styled: true, // include daisyUI colors and design decisions for all components
        utils: true, // adds responsive and modifier utility classes
        rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
        prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
        logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    },
}

// rwc image: https://www.rugbyworldcup.com/rwc2023-resources/prod/rwc2023_v4.1.0/i/bg-elements/shapes/main.png
