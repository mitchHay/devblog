import { NextScript } from 'next/document';
import dynamic from 'next/dynamic';

const Html = dynamic(() => import('next/document').then(mod => mod.Html));
const Head = dynamic(() => import('next/document').then(mod => mod.Head));
const Main = dynamic(() => import('next/document').then(mod => mod.Main));

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
