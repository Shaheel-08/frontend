/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // make sure your source files are included
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(210, 20%, 98%)",
        foreground: "hsl(210, 15%, 20%)",
        card: "hsl(0, 0%, 100%)",
        "card-border": "hsl(210, 20%, 90%)",
        accent: "hsl(210, 20%, 95%)",
        primary: "hsl(210, 85%, 45%)",
        "primary-dark": "hsl(210, 90%, 35%)",
        "medical-green": "hsl(142, 70%, 45%)",
        "critical-light": "hsl(0, 84%, 95%)",
        critical: "hsl(0, 84%, 55%)",
        warning: "hsl(38, 84%, 55%)",
        "warning-light": "hsl(38, 84%, 95%)",
        secondary: "hsl(210, 20%, 95%)",
        surface: "hsl(0, 0%, 100%)",
        muted: "hsl(210, 20%, 96%)",
        "muted-foreground": "hsl(210, 10%, 55%)",
        input: "hsl(210, 20%, 96%)",
        "input-border": "hsl(210, 20%, 85%)",
      },
    },
  },
  plugins: [],
};
