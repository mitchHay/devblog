import { Lacquer, Roboto } from "@next/font/google";

const roboto = Roboto({
  weight: ['100', '300', '400', '700'],
  subsets: ['latin']
});

const lacquer = Lacquer({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap'
});

const fontClasses = (): string => {
  return roboto.className;
}

const getFontClass = (font: 'Roboto' | 'Lacquer'): string => {
  switch (font) {
    case 'Roboto':
      return roboto.className;
    case 'Lacquer':
      return lacquer.className;
  }
}

export {
  fontClasses,
  getFontClass
}