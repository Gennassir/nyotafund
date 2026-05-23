/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Kenyan Government Colors
        primary: '#006600',        // Kenyan Green
        secondary: '#004d00',      // Dark Kenyan Green
        accent: '#e31937',          // Kenyan Red
        accentDark: '#b71c1c',      // Dark Kenyan Red
        government: '#003366',      // Government Blue
        
        // Professional Milk White Theme
        lightbg: '#fdfdfd',        // Milk white background
        cardbg: '#fafafa',         // Soft white for cards
        textdark: '#2c2c2c',       // Professional dark text
        textlight: '#6b6b6b',      // Medium gray
        textmuted: '#9a9a9a',      // Light gray
        border: '#e8e8e8',         // Soft borders
        
        // Professional gradients
        primaryGradient: 'linear-gradient(135deg, #006600 0%, #004d00 100%)',
        accentGradient: 'linear-gradient(135deg, #e31937 0%, #b71c1c 100%)',
        milkGradient: 'linear-gradient(135deg, #fdfdfd 0%, #fafafa 100%)',
      },
      fontFamily: {
        'government': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
