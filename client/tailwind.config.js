import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            screens: {
                xs: '320px',
                s: '428px',
                sm: '768px',
                md: '1024px',
                lg: '1200px',
                xl: '1512px',
            },
            colors: {
                brand: {
                    color: '#642afb',
                },
            },
            spacing: {
                'minus-10': '-10px',
                'ten-percent': '10%',
                'fifteen-percent': '15%',
                'eighty-percent': '80%',
                'spacing-xs': '0.25rem',
                'spacing-sm': '0.50rem',
                'spacing-sm-md': '0.75rem',
                'spacing-md': '1rem',
                'spacing-lg': '1.25rem',
                'spacing-xl': '1.50rem',
                'eighty-vh': '80vh',
                75: '75px',
                100: '100px',
                120: '120px',
                200: '200px',
                350: '350px',
                940: '940px'
            },
            fontSize: {
                'functional-regular-xl': [
                    '1.75rem',
                    {
                        lineHeight: '1.2',
                    },
                ],
                'functional-regular-md': [
                    '1.25rem',
                    {
                        lineHeight: '1.2',
                    },
                ],
                'menu-title': [
                    '1rem',
                    {
                        lineHeight: '1.2',
                        fontWeight: 500,
                    },
                ],
                'price-text': [
                    '0.9rem',
                    {
                        lineHeight: '1.2',
                        fontWeight: 500,
                    },
                ],
                'modal-section-title-sm': [
                    '1rem',
                    {
                        lineHeight: '1.2',
                        fontWeight: 500,
                    },
                ],
                'modal-section-title-xs': [
                    '0.8rem',
                    {
                        lineHeight: '1.2',
                        fontWeight: 500,
                    },
                ],
            },
            translate: {
                '-1/2': '-50%',
            },
        },
    },
    darkMode: "class",
    plugins: [
        nextui(),
        function ({ addUtilities }) {
            const newUtilities = {
              '.translate-center': {
                transform: 'translateX(-50%) translateY(-50%)',
              },
            };
      
            addUtilities(newUtilities, ['responsive', 'hover']);
        },
    ]
}

