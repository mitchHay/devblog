import styles from '../styles/Header.module.scss';
import { faHome, faAddressCard, faFolder, faFolderTree } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { Lacquer } from "@next/font/google";

const lacquer = Lacquer({
  weight: [ '400' ],
  display: 'swap'
});

export default function Header() {
  return (
    <nav className={ `${lacquer.className} ${styles.navigation}` }>
      <ul>
        <li className={ styles.navItem }>
          <Link href='/'>
            <FontAwesomeIcon icon={ faHome }/>
            <span>Home</span>
          </Link>
        </li>
        <li className={ styles.navItem }>
          <Link href='/about'>
            <FontAwesomeIcon icon={ faAddressCard }/>
            <span>About me</span>
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
    </nav>
  );
}