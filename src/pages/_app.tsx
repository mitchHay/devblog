import '../styles/globals.scss';
import type { AppProps, NextWebVitalsMetric } from 'next/app';
import dynamic from 'next/dynamic';

import { getFontFamily } from '../services/fonts.service';

const Head = dynamic(() => import('next/head'));
const Layout = dynamic(() => import('../components/Layout'));

export function reportWebVitals(metric: NextWebVitalsMetric) {
  const env = process.env.NODE_ENV;
  if (!!env && env === 'development') {
    console.log(metric);
  }
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
        <link rel="preconnect" href="https://cdn.lordicon.com" />
      </Head>
      <style jsx global>{`
        html,
        input,
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
