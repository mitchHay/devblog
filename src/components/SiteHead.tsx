import dynamic from 'next/dynamic';

const Head = dynamic(() => import('next/head'));

export type SiteHeadProps = {
  title: string,
  description: string,
  ogImage?: string
};

export default function SiteHead({ title, description, ogImage = "" }: SiteHeadProps) {
  const href = 
    typeof window !== 'undefined' && window.location.href
      ? window.location.href
      : '';

  const origin =
    typeof window !== 'undefined' && window.location.origin
        ? window.location.origin
        : '';

  return (
    <Head>
      <title>{ title }</title>
      <meta property="og:title" content={ title }></meta>
      <meta name="description" content={ description }></meta>
      <meta property="og:description" content={ description }></meta>
      <meta property="og:site_name" content="Mitchell Hayward"></meta>
      <meta property="og:url" content={href}></meta>
      <meta property="og:type" content="website"></meta>
      {
        !!ogImage && (
          <meta property="og:image" content={ `${origin}${ogImage}` }></meta>
        )
      }
    </Head>
  )
}