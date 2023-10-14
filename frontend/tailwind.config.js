/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {},
    backgroundImage: {
      "img-institute":
        "url('https://images.pexels.com/photos/6147276/pexels-photo-6147276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
      "img-student":
        "url('https://images.pexels.com/photos/2973323/pexels-photo-2973323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
    },
  },
  plugins: [],
};
