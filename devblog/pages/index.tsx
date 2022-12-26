import Head from 'next/head';
import { fontClasses } from '../services/fonts.service';
import styles from '../styles/Home.module.scss';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Mitchell Hayward</title>
        <meta name="description" 
              content="Hey I'm Mitch! I'm a software developer with a passion for front-end development, 
              game development, and test automation! Here you'll find my blog and developer portfolio, 
              feel free to have a lil' nosey - I don't bite!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main + ' ' + fontClasses()}>
        {/* TODO: Make component */}
        <div className={styles.hero}>
          <span>Hello</span>
        </div>
      </main>
    </>
  )
}
