import localFont from 'next/font/local'

export const graphik = localFont({
  src: [
    {
      path: './fonts/Graphik-Light-Trial.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/Graphik-Regular-Trial.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Graphik-Medium-Trial.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Graphik-Semibold-Trial.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/Graphik-Bold-Trial.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/Graphik-Black-Trial.otf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-graphik',
})

export const oorangeregular = localFont({
  src: [
    {
      path: './fonts/oorangeregular.ttf',
    },
  ],
  variable: '--font-oorange',
})