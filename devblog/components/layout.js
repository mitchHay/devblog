import dynamic from 'next/dynamic';

const Header = dynamic(() => import('../components/header'));
const Footer = dynamic(() => import('../components/footer'));

export default function Layout({children}) {
  return (
    <>
      <Header/>
      { children }
      <Footer/>
    </>
  );
}