import { extendTheme } from '@chakra-ui/react'

const breakpoints = {
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
}

const theme = extendTheme(
  {
    colors: {
      paint: {
        teal: '#4FA3A5',
        blue: '#5200ff',
        green: '#9AE6B4',
        deepBlue: '#3a06b2',
        white: '#fff',
        black: 'linear(to-r, rgba(0, 0 ,0 ,0.4), rgba(0, 0 ,0 ,0.2))',
      },
    },
    fonts: {
      heading: `'Outfit', sans-serif`,
      body: `'Outfit', sans-serif`,
    },
    styles: {
      global: (props: any) => ({
        'html, body': {
          color: '#fff',
          // props.colorMode === 'dark' ? 'whiteAlpha.900' : 'blackAlpha.900',
          // bg: props.colorMode === 'dark' ? 'paint.black' : '#fff',
          bg: '#171923',
        },
        '::-webkit-scrollbar': {
          width: '0.4px',
          webkitOverflowScrolling: 'touch',
        },
        '.hide-scrollbar': {
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        },
        '.viewBox': {
          minHeight: 'calc(100vh - 5rem)',
        },
        a: {
          textDecoration: 'none',
          _hover: {
            color: 'black.400',
          },
        },
        'a.active': {
          color: 'red.400',
          _hover: {
            color: 'teal.400',
            transition: 'all 0.3s ease',
          },
        },
        '.done': {
          color: 'teal',
        },
        '.inProgress': {
          animation: 'inProgress 1s ease infinite alternate',
        },
        '.navbar-active': {
          display:'none'
        },
      }),
    },
  },
  { breakpoints }
)

export default theme
