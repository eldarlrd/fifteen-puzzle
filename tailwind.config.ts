/** @type {import('tailwindcss').Config} */

// https://tailwindcss.com/docs/configuration
export default {
  content: [
    'index.html',
    'src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: { main: 'Righteous, sans' }
    }
  }
}