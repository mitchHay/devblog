import '../styles/globals.scss';
import type { AppProps, NextWebVitalsMetric } from 'next/app';
import dynamic from 'next/dynamic';

import { getFontFamily } from '../services/fonts.service';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import GTMService from '../services/gtm.service';
import { Partytown } from '@builder.io/partytown/react';

const Head = dynamic(() => import('next/head'));
const ContactModal = dynamic(() => import('../components/ContactModal'));
const Layout = dynamic(() => import('../components/Layout'));

export function reportWebVitals(metric: NextWebVitalsMetric) {
  const env = process.env.NODE_ENV;
  if (!!env && env === 'development') {
    console.log(metric);
  }
}

const gtmService = new GTMService();

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const googleAnalyticsId = gtmService.trackingId;

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (!gtmService.gtagExists) {
        console.warn('Failed to fire event, window.gtag is not defined');
        return;
      }

      gtmService.pageView(url);
    }

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Favicon */}
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />

        {/* Preconnects */}
        <link rel="preconnect" href="https://cdn.lordicon.com" />

        {/* Partytown */}
        <Partytown forward={['gtag']} />

        {/* Analytics */}
        {
          !!googleAnalyticsId &&
          <>
            <Script src={`${gtmService.gtmUrl}/js?id=${googleAnalyticsId}`}
                    strategy='worker'/>

            <Script id='gtag'
                    strategy='worker'>
              {`
                window.dataLayer = window.dataLayer || [];
                window.gtag = function gtag() {
                  window.dataLayer.push(arguments);
                }

                gtag('js', new Date());        
                gtag('config', '${googleAnalyticsId}');
              `}
            </Script>
          </>
        }
      </Head>

      {/* Global font styling via next/font */}
      <style jsx global>
        {`
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
        `}
      </style>

      {/* Website layout */}
      <Layout>
        <ContactModal />
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
