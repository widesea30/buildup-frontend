module.exports = {
  important: true,
  purge: {
    enabled: false,
    content: [
      './src/**/*.html',
      './src/**/*.scss'
    ]
  },
  theme: {
    extend: {
      fontSize: {
        '22': '1.375rem'
      },
      colors: {
        rouge: '#FF0018',
        gris_paler: '#F5F5F5',
        brown: '#827576'
      }
    },
  },
  variants: {},
  plugins: [],
}
