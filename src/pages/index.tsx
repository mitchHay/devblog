import styles from '../styles/Home.module.scss';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { openDialog } from '../components/ContactModal';

const SiteHead = dynamic(() => import('../components/SiteHead'));
const Image = dynamic(() => import('next/image'));
const FadeIn = dynamic(() => import('../components/FadeIn'));
const ContactModal = dynamic(() => import('../components/ContactModal'));
const Hero = dynamic(() => import('../components/Hero'));

export default function Home() {
  const query = useRouter().query;
  const { open } = query;

  if (!!open) {
    switch (open) {
      case 'contact':
        const contactForm = document.getElementById('contact-form');
        if (contactForm?.style.display === 'block') {
          break;
        }

        openDialog();
        break;
    }
  }

  return (
    <>
      <SiteHead title={'Home | Mitchell Hayward'}
        description={"Hey I'm Mitch! I'm a software developer with a passion for front-end development, game development, and test automation! Here you'll find my blog and developer portfolio, feel free to have a lil' nosey - I don't bite!"} />
      <main className={styles.main}>
        <ContactModal />

        {/* TODO: Make component */}
        <div className={styles.hero}>
          <FadeIn className={styles.container}>
            <Image className={styles.avatar}
              src={'/avatar.png'}
              alt={'Developer profile picture'}
              width={150}
              height={150}
              priority={true}
              placeholder='blur'
              loading='eager' />
              
            <h1>Hey, I'm Mitch <span>👋</span></h1>
            <h2>A little about me?</h2>
            <p>I’ve been in the software engineering industry for five years! I love test automation, video games, and at the risk of sounding a bit vague the full vertical slice of development (although I do have a deep love for front-end developement in particular)!</p>
          </FadeIn>

          <FadeIn>
            <Hero
              title="Keen to see what I've done?"
              order='reverse'
              type='innerHero'
              link={{
                text: 'See my work',
                href: '/portfolio'
              }}
              lordIcon={{
                src: 'zjscbpdr.json',
                loading: 'eager',
                delay: 10,
                colors: {
                  primary: '#0A0012',
                  secondary: '#BD93F9'
                }
              }}
            />
          </FadeIn>

          <FadeIn className={styles.container}>
            <h2>Want to know an absolutely shocking fact?</h2>
            <p>I actually got into programming through video games. The first thing I ever tinkered with was creating Minecraft mods and servers with Java. I quickly leaped into Unity - where I well and truly got bitten by the software dev (and game dev) bug.</p>
          </FadeIn>

          <FadeIn>
            <Hero
              title="I'm all about knowledge sharing"
              type='innerHero'
              link={{
                text: 'Read my blog',
                href: '/blog'
              }}
              lordIcon={{
                src: 'flvisirw.json',
                loading: 'eager',
                delay: 1000,
                colors: {
                  primary: '#0A0012',
                  secondary: '#BD93F9'
                }
              }}
            />
          </FadeIn>

          <FadeIn className={styles.container}>
            <h2>What gets me up in the morning?</h2>
            <p>I love making applications, games, and libraries that deliver awesome user/developer experiences. I’m 110% all about bringing amazing features and experiences to anyone who uses a product I’ve had the pleasure of working on. I’m also a huge lover of knowledge sharing, mentoring, and supporting people’s growth and development journeys in anyway I possibly can.</p>
          </FadeIn>

        </div>

        <FadeIn>
          <Hero
            title="Love my work?"
            type='outerHero'
            order='reverse'
            dark={true}
            button={{
              text: "Contact me",
              onClick: openDialog,
              type: 'secondary'
            }}
            lordIcon={{
              src: 'pdpnqfoe.json',
              loading: 'eager',
              delay: 1000,
              colors: {
                primary: '#BD93F9',
                secondary: '#0A0012'
              }
            }}
          />
        </FadeIn>

      </main>
    </>
  )
}
