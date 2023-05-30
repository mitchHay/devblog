// Global styles
import '../styles/globals.scss';

import dynamic from "next/dynamic";
import { Metadata } from 'next';

const Head = dynamic(() => import('next/head'));
const Header = dynamic(() => import('../components/Header'));
const Footer = dynamic(() => import('../components/Footer'));
const FontStyles = dynamic(() => import('../components/FontStyles'));

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.png"
  },
  viewport: "width=device-width, initial-scale=1"
}

// TODO: Factor out into server components
export default function RootLayout({children}: any): React.ReactNode {
  return (
    <html lang="en">
      <Head>
        <link rel="preconnect" href="https://cdn.lordicon.com" />
      </Head>
      <body>
        <FontStyles />
        <Header />
        { children }
        <Footer />
      </body>
    </html>
  );
}
