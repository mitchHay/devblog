import styles from '../styles/Header.module.scss';

import { getFontClass } from '../services/fonts.service';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const Link = dynamic(() => import('next/link'));

// TODO: Rewrite this all to use state
function assignActiveTab(route: string) {
  if (typeof window !== 'undefined') {
    const links = document.getElementsByTagName('a');
    if (!links || links.length < 1) {
      return;
    }

    for (let i = 0; i < links.length; i++) {
      const item = links.item(i);
      item!.classList.remove(styles.active);
    }

    for (let i = 0; i < links.length; i++) {
      const item = links.item(i);
      const active = item!.href.includes(route) || route.includes('post') && item!.href.includes('blog');

      if (active) {
        item!.classList.add(styles.active);
        break;
      }
    }
  }
}

function assignDisplayMode(displayMode: 'none' | 'flex') {
  const navElement = document.querySelector(`.${styles.navigation}`);
  if (!navElement) {
    return;
  }

  const menus = navElement.querySelectorAll('ul');
  for (let i = 0; i < menus.length; i++) {
    menus.item(i).style.display = displayMode;
  }
}

let opened = false;
export default function Header() {
  let route = useRouter().asPath;
  let routeName = route;
  
  if (routeName === '/' || routeName.includes('?open=contact')) {
    routeName = 'Home';
  } else if (routeName.includes('/')) {
    const routeSegments = routeName.split('/');
    routeName = routeSegments[routeSegments.length - 1];
  }

  assignActiveTab(route);

  if (opened) {
    assignDisplayMode('none');
    opened = false;
  }

  return (
    <nav className={ `${getFontClass('Lacquer')} ${styles.navigation}` }>
      <div className={ styles.mobileMenu } onClick={
        () => {
          if (opened) {
            opened = false;
            assignDisplayMode('none');
          } else {
            opened = true;
            assignDisplayMode('flex');
          }
        }
      }>
        <span className={ styles.route }>{ routeName }</span>
        <img src={'/images/icon-bars.svg'}
             width={16}
             height={16}
             loading='eager'
             alt='Open navigation menu'/>
      </div>
      <ul className={ styles.navigationContainer }>
        <li className={ styles.navItem }>
          <Link href='/'>
            <img src='/images/icon-home.svg'
                 width={16}
                 height={16}
                 loading='eager'
                 alt="Home" />
            <span>Home</span>
          </Link>
        </li>
        <li className={ styles.navItem }>
          <Link href='/portfolio'>
            <img src='/images/icon-folder-closed.svg'
                 width={16}
                 height={16}
                 loading='eager'
                 alt="Mitchell Hayward's portfolio" />
            <span>My work</span>
          </Link>
        </li>
        <li className={ styles.navItem }>
          <Link href='/blog'>
            <img src='/images/icon-blog.svg'
                 width={16}
                 height={16}
                 loading='eager'
                 alt="Mitchell Hayward's blog" />
            <span>My blog</span>
          </Link>
        </li>
      </ul>
      <ul className={styles.socialsContainer}>
        <li className={ styles.navItem }>
          <Link href='https://twitter.com/mitchy_hay' target='_blank'>
            <img src='/images/icon-twitter.svg'
                 width={16}
                 height={16}
                 loading='eager'
                 alt="Mitchell Hayward's Twitter" />
            <span>Twitter</span>
          </Link>
        </li>
        <li className={ styles.navItem }>
          <Link href='https://github.com/mitchHay' target='_blank'>
            <img src='/images/icon-github.svg'
                 width={16}
                 height={16}
                 loading='eager'
                 alt="Mitchell Hayward's Github"/>
            <span>Github</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}