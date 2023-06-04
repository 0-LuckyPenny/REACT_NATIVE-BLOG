const COLORS = {
  orange: '#FF6C00',
  blue: '#1B4371',
  background: '#F6F6F6',
  white: '#FFFFFF',
  black: '#212121',
  textColor: '#BDBDBD',
  borderColor: '#E8E8E8',
  bgWithOpacity: '#FFFFFF4D',
  iconColor: '#212121CC',
}

const FONTS = {
  regular: 'Roboto-Regular', //400
  medium: 'Roboto-Medium', //500
}

const FONTSIZES = [8, 12, 14, 16, 18, 20, 24, 28, 32, 48, 68]

const SPACE = [0, 4, 8, 16, 20, 24, 32, 64, 128, 256, 512]

const RADII = {
  none: 0,
  sm: 4,
  md: 8,
  l: 12,
  lg: 16,
  xxl: 20,
  xlg: 25,
  xxxl: 30,
  xxxxl: 100,
  round: '50%',
}

const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
}

export { COLORS, FONTS, SHADOWS, SPACE, FONTSIZES, RADII }
