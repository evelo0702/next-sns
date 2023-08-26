/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        mainColor: "#9fc8ec",
        skyblue: "#9fc8ec",
        gradientStart: "#30cfd0",
        gradientEnd: "#330867",
        avatarGradientStart: "#a1c4fd",
        avatarGradientEnd: "#4286f4",
      },
      screens: {
        mobile: "320px",

        tablet: "640px",
        // => @media (min-width: 640px) { ... }

        desktop: "1024px",
        // => @media (min-width: 1280px) { ... }
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
