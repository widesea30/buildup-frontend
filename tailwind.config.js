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
        brown: '#827576',
        gray1: '#E8E8E8',
        gray2: '#F5F5F5',
        gray3: '#4A4A4A',
        gray4: '#F0F0F0'
      }
    },
  },
  variants: {},
  plugins: [],
}
