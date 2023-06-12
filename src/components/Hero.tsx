import dynamic from "next/dynamic";
import { LordIconProps } from "./LordIcon";

// Styles
import styles from '../styles/Hero.module.scss';
import { ButtonType } from "../models/button-type";
import { MouseEventHandler } from "react";

// Component imports
const LordIcon = dynamic(() => import('../components/LordIcon'));
const Link = dynamic(() => import('next/link'));

export type HeroProps = {
  title: string,
  dark?: boolean,
  type?: 'innerHero' | 'outerHero',
  order?: 'reverse' | 'normal',
  lordIcon?: LordIconProps,
  button?: {
    text: string,
    onClick: MouseEventHandler<HTMLButtonElement>,
    type: ButtonType
  }
  link?: {
    text: string,
    href: string
  }
}

/**
 * Hero component used to display an image or lord icon animation alongside a title and link button (if provided)
 */
export default function Hero({ title, dark, type, order, lordIcon, link, button }: HeroProps): React.ReactElement {
  const classNames = [ styles.heroCta ];
  if (!dark) {
    classNames.push(styles.heroLight);
  }

  switch (type) {
    case 'innerHero':
      classNames.push(styles.heroInner)
      break;
    case 'outerHero':
      classNames.push(styles.heroOuter);
      break;
  }

  if (!order) {
    order = 'normal';
  }

  switch (order) {
    case 'reverse':
      classNames.push(styles.heroReverse);
      break;
  }
  
  return (
    <div className={classNames.join(' ')}>
      {
        !!lordIcon &&
        <LordIcon 
          primaryColor={lordIcon.primaryColor}
          secondaryColor={lordIcon.secondaryColor}
          src={lordIcon.src} 
          height={150} 
          width={150} 
          trigger={'in-viewport'} 
          delay={lordIcon.delay}
          loading={lordIcon.loading ?? 'lazy'} />        
      }

      <div className={styles.heroContainer}>
        <h2>{ title }</h2>
        
        {/* Links */}
        {
          !!link &&
          <Link className='btn' href={link.href}>{link.text}</Link>
        }

        {/* Buttons */}
        {
          !!button &&
          <button className={`btn ${button.type}`} onClick={button.onClick}>{button.text}</button>
        }

      </div>
    </div>
  )
}
