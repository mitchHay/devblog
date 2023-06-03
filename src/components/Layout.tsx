import dynamic from 'next/dynamic';

const Header = dynamic(() => import('./Header'));
const Footer = dynamic(() => import('./Footer'));

export default function Layout({children}: any) {
  return (
    <>
      <Header/>
      { children }
      <Footer/>
    </>
  );
}