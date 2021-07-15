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
        '22': '22px',
        '27': '27px',
        '34': '34px',
        '38': '38px',
      },
      colors: {
        rouge: '#FF0018',
        brown: '#827576',
        gray1: '#E8E8E8',
        gray2: '#F5F5F5',
        gray3: '#4A4A4A',
        gray4: '#F0F0F0',
        gray5: '#F7E4E6',
        green1: '#94E866',
      },
      opacity: {
        '8': '0.08',
        '55': '0.55',
      },
      borderOpacity: {
        '8': '0.08'
      },
      textOpacity: {
        '55': '0.55',
      },
      borderRadius: {
        '10': '10px',
      },
      width: {
        '7.5': '30px',
        '8.5': '34px',
        '9.5': '38px',
        '70': '280px',
        '77.5': '310px',
      },
      height: {
        '7.5': '30px',
        '8.5': '34px',
        '9.5': '38px',
      },
      padding: {
        '12.5': '50px'
      }
    },
  },
  variants: {},
  plugins: [],
}
