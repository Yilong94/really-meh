module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minHeight: {
        4: "1rem",
        8: "2rem",
        12: "3rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ["last"],
    },
  },
  plugins: [],
};
