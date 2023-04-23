import styles from '../styles/Header.module.scss';
import { faHome, faFolder, faFolderTree, faBars, faClose } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';

import { getFontClass } from '../services/fonts.service';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const Link = dynamic(() => import('next/link'));
const FontAwesomeIcon = dynamic(() => import('@fortawesome/react-fontawesome').then(mod => mod.FontAwesomeIcon));

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
  if (typeof window === 'undefined') {
    return;
  }

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
            assignDisplayMode('none');
            opened = false;
          } else {
            assignDisplayMode('flex');
            opened = true;
          }
        }
      }>
        <span className={ styles.route }>{ routeName }</span>
        <FontAwesomeIcon icon={ opened ? faClose : faBars }/>
      </div>
      <ul className={ styles.navigationContainer }>
        <li className={ styles.navItem }>
          <Link href='/'>
            <FontAwesomeIcon icon={ faHome }/>
            <span>Home</span>
          </Link>
        </li>
        <li className={ styles.navItem }>
          <Link href='/portfolio'>
            <FontAwesomeIcon icon={ faFolder }/>
            <span>My work</span>
          </Link>
        </li>
        <li className={ styles.navItem }>
          <Link href='/blog'>
            <FontAwesomeIcon icon={ faFolderTree }/>
            <span>My blog</span>
          </Link>
        </li>
      </ul>
      <ul className={styles.socialsContainer}>
        <li className={ styles.navItem }>
          <Link href='https://twitter.com/mitchy_hay' target='_blank'>
            <FontAwesomeIcon icon={ faTwitter }/>
            <span>Twitter</span>
          </Link>
        </li>
        <li className={ styles.navItem }>
          <Link href='https://github.com/mitchHay' target='_blank'>
            <FontAwesomeIcon icon={ faGithub }/>
            <span>Github</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}