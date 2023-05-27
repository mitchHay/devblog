import { Josefin_Sans, Lacquer } from "next/font/google";

const lacquer = Lacquer({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap'
});

const josefinSans = Josefin_Sans({
  weight: ['100', '200', '300', '400', '700'],
  subsets: ['latin']
})

const getFontClass = (font: 'Josefin Sans' | 'Lacquer'): string => {
  switch (font) {
    case 'Josefin Sans':
      return josefinSans.className;
    case 'Lacquer':
      return lacquer.className;
  }
}

const getFontFamily = (font: 'Josefin Sans' | 'Lacquer'): string => {
  switch (font) {
    case 'Josefin Sans':
      return josefinSans.style.fontFamily;
    case 'Lacquer':
      return lacquer.style.fontFamily;
  }
}

export {
  getFontClass,
  getFontFamily
}