import { fontClasses, getFontClass } from '../services/fonts.service';
import styles from '../styles/Home.module.scss';
import dynamic from 'next/dynamic';

const SiteHead = dynamic(() => import('../components/siteHead'));
const Image = dynamic(() => import('next/image'));

export default function Home() {
  return (
    <>
      <SiteHead title={'Home | Mitchell Hayward'}
            description={"Hey I'm Mitch! I'm a software developer with a passion for front-end development, game development, and test automation! Here you'll find my blog and developer portfolio, feel free to have a lil' nosey - I don't bite!"}/>
      <main className={styles.main + ' ' + fontClasses()}>
        {/* TODO: Make component */}
        <div className={styles.hero}>
          <Image className={styles.avatar}
                 src={'/avatar.png'} 
                 alt={'Developer profile picture'}
                 width={150}
                 height={150}></Image>
          <h1 className={getFontClass('Lacquer')}>Hey, I'm Mitch 👋</h1>
        </div>
      </main>
    </>
  )
}
