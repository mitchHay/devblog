import dynamic from 'next/dynamic';
import styles from '../styles/Portfolio.module.scss';

const LordIcon = dynamic(() => import('../components/LordIcon'));
const SiteHead = dynamic(() => import('../components/SiteHead'));
const FadeIn = dynamic(() => import('../components/FadeIn'));
const Link = dynamic(() => import('next/link'));

export default function Portfolio() {
  return (
    <>
      <SiteHead title={'Portfolio | Mitchell Hayward'}
        description={"Checkout my portfolio of work. Ranging from full-stack development, game development, and test automation."} />
      <main>
        <FadeIn className={styles.heroCta}>
          <LordIcon colors={{
            primary: '#0A0012',
            secondary: '#BD93F9'
          }} src={'jyijxczt.json'} height={180} width={180} trigger={'loop'} delay={'10'} />
          <div className={styles.heroContainer}>
            <h2>I'm delivering something... soon!</h2>
            <p>Looks like this page is currently under construction.</p>
            <p>
              Feel free to <Link href={'/blog'}>read my blog</Link> in the meantime to keep yourself occupied.
            </p>
          </div>
        </FadeIn>
      </main>
    </>
  )
}