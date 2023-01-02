import styles from '../styles/Header.module.scss';
import { faHome, faFolder, faFolderTree, faBars, faClose } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { getFontClass } from '../services/fonts.service';
import { useRouter } from 'next/router';

function assignActiveTab(route) {
  if (typeof window !== 'undefined') {
    const links = document.getElementsByTagName('a');

    for (let i = 0; i < links.length; i++) {
      const item = links.item(i);
      item.classList.remove(styles.active);
    }

    for (let i = 0; i < links.length; i++) {
      const item = links.item(i);
      const active = item.href.includes(route) || route.includes('post') && item.href.includes('blog');

      if (active) {
        item.classList.add(styles.active);
        break;
      }
    }
  }
}

function assignDisplayMode(displayMode) {
  const menus = document.getElementsByTagName('ul');
  for (let i = 0; i < menus.length; i++) {
    menus.item(i).style.display = displayMode;
  }
}

export default function Header() {
  let opened = false;
  let route = useRouter().asPath;

  assignActiveTab(route);

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
        <span className={ styles.route }>{ route }</span>
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