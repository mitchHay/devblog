import dynamic from 'next/dynamic';
import styles from '../styles/Portfolio.module.scss';
import { openDialog } from '../components/ContactModal';

const LordIcon = dynamic(() => import('../components/LordIcon'));
const SiteHead = dynamic(() => import('../components/SiteHead'));
const FadeIn = dynamic(() => import('../components/FadeIn'));
const Image = dynamic(() => import('next/image'));
const Link = dynamic(() => import('next/link'));
const ContactModal = dynamic(() => import('../components/ContactModal'));

export default function Portfolio() {
  return (
    <>
      <SiteHead title={'Portfolio | Mitchell Hayward'}
        description={"Checkout my portfolio of work. Ranging from full-stack development, game development, and test automation."} />
      <main>
        <ContactModal />

        <FadeIn className={styles.heroCta}>
          <LordIcon 
            colors={{
              primary: '#0A0012',
              secondary: '#BD93F9'
            }}
            src={'zjscbpdr.json'} 
            height={150} 
            width={150} 
            trigger={'in-viewport'} 
            delay={'10'} />

          <div className={styles.heroContainer}>
            <h1>My Work</h1>
          </div>
        </FadeIn>

        <FadeIn className={styles.portfolioDescription}>
          <p>👇 Take a look at some of the things I've made below 👇</p>
        </FadeIn>

        <div className={styles.timeline}>
          <FadeIn 
            className={`${styles.timelineContainer}
            ${styles.timelineContainerHTML}`}>
            <div className={styles.timelineContent}>
              <h2>Makeup By Amy Maree</h2>
              <div className={styles.timelineDescription}>Jan 2023 - Static Site</div>
              <Image fill 
                     alt='Makeup By Amy Maree website by Mitchell hayward'
                     src={'/work/makeupbyamymaree.png'}
                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                     priority={true}
                     placeholder='blur' />
            </div>
            <Link className={`btn primary ${styles.ctaBtn}`} href={'https://makeupbyamymaree.com.au'} target='_blank'>Check it out!</Link>
          </FadeIn>
        </div>

        <FadeIn className={`${styles.heroCta} ${styles.heroBasic}`}>
          <div className={styles.heroContainer}>
            <h2>Loving what you see? </h2>
            <button className='btn secondary' onClick={openDialog}>Contact me</button>
          </div>
        </FadeIn>

      </main>
    </>
  )
}