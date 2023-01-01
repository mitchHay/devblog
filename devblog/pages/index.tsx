import styles from '../styles/Home.module.scss';
import dynamic from 'next/dynamic';

const SiteHead = dynamic(() => import('../components/siteHead'));
const Image = dynamic(() => import('next/image'));
const LordIcon = dynamic(() => import('../components/lordIcon'));
const Link = dynamic(() => import('next/link'));

export default function Home() {
  return (
    <>
      <SiteHead title={'Home | Mitchell Hayward'}
            description={"Hey I'm Mitch! I'm a software developer with a passion for front-end development, game development, and test automation! Here you'll find my blog and developer portfolio, feel free to have a lil' nosey - I don't bite!"}/>
      <main className={styles.main}>
        {/* TODO: Make component */}
        <div className={styles.hero}>
          <Image className={styles.avatar}
                 src={'/avatar.png'} 
                 alt={'Developer profile picture'}
                 width={150}
                 height={150}></Image>
          <h1>Hey, I'm Mitch 👋</h1>
          <h2>A little about me?</h2>
          <p>I’ve been in the software engineering industry for five years! I love test automation, video games, and at the risk of sounding a bit vague the full vertical slice of development (although I do have a deep love for front-end developement in particular)!</p>
          <div className={`${styles.heroCta} ${styles.heroLight} ${styles.heroReverse} ${styles.innerHero}`}>
            <LordIcon colors={{
              primary: '#0A0012',
              secondary: '#BD93F9'
            }} src={'https://cdn.lordicon.com/zjscbpdr.json'} height={150} width={150} trigger={'loop'} delay={'10'}/>
            <div className={styles.heroContainer}>
              <h2>Keen to see what I've done?</h2>
              <Link className='btn' href={'/portfolio'}>See my work</Link>
            </div>
          </div>
          <h2>Want to know an absolutely shocking fact?</h2>
          <p>I actually got into programming through video games. The first thing I ever tinkered with was creating Minecraft mods and servers with Java. I quickly leaped into Unity - where I well and truly got bitten by the software dev (and game dev) bug.</p>
          <div className={`${styles.heroCta} ${styles.heroLight} ${styles.heroInner}`}>
            <LordIcon colors={{
              primary: '#0A0012',
              secondary: '#BD93F9'
            }} src={'https://cdn.lordicon.com/flvisirw.json'} height={150} width={150} trigger={'loop'} delay={'1000'}/>
            <div className={styles.heroContainer}>
              <h2>I'm all about knowledge sharing</h2>
              <Link className='btn' href={'/blog'}>Read my blog</Link>
            </div>
          </div>
          <h2>What gets me up in the morning?</h2>
          <p>I love making applications, games, and libraries that deliver awesome user/developer experiences. I’m 110% all about bringing amazing features and experiences to anyone who uses a product I’ve had the pleasure of working on. I’m also a huge lover of knowledge sharing, mentoring, and supporting people’s growth and development journeys in anyway I possibly can.</p>
        </div>
      </main>
    </>
  )
}
