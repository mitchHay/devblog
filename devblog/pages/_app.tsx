import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Head from 'next/head';
import { getFontFamily } from '../services/fonts.service';
config.autoAddCss = false;

const Layout = dynamic(() => import('../components/layout'));

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <style jsx global>{`
        html,
        button {
          font-family: ${getFontFamily('Josefin Sans')};
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: ${getFontFamily('Lacquer')};
        }
      `}</style>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
