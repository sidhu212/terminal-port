/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: "#0d0d0f",
          header: "#1a1a1e",
          accent: "#f27b7d", // The peach/coral color from the image
          text: "#e5e7eb",   // Light gray for general text
          prompt: "#f27b7d",
          path: "#89b4fa",   // Blue for the ~ path
          dim: "#4b5563",    // Dim gray for descriptions
        }
      },
      fontFamily: {
        mono: ['"Fira Code"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      screens: {
        'xs': '480px',
      },
    },
  },
  plugins: [],
}

