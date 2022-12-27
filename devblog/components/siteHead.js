import dynamic from 'next/dynamic';

const Head = dynamic(() => import('next/head'));

export default function SiteHead({ title, description }) {
  return (
    <Head>
      <title>{ title }</title>
      <meta name="description" content={ description }></meta>
    </Head>
  )
}