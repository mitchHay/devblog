import { ReactElement } from "react";
import { getFontClass } from "../services/fonts.service";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";

import styles from '../styles/components/ContactModal.module.scss';

const FontAwesomeIcon = dynamic(() => import('@fortawesome/react-fontawesome').then(mod => mod.FontAwesomeIcon));

export type ContactModalProps = {

};

export function openDialog(): void {
  const form = document.getElementById('contact-form');

  if (!form) {
    return;
  }
  
  if (form?.style.display === 'none' || !form?.style.display) {
    form.style.display = 'block';
    return;
  }

  form.style.display = 'none';
}

export default function ContactModal({}: ContactModalProps): ReactElement {
  return (
    <div className={styles.contact} id='contact-form'>
      <form name="contact" method="POST">
        <button type='button' className={styles.closeBtn} onClick={openDialog}><FontAwesomeIcon icon={faClose}/></button>
        <span className={`${styles.contactTitle} ${getFontClass('Lacquer')}`}>Contact me</span>

        <label htmlFor='name'>Your Name:</label>
        <input type="text" name="name" placeholder='John Smith'/>

        <label htmlFor='email'>Your Email:</label>
        <input type="email" name="email" placeholder='you@mailprovider.com' />

        <label htmlFor='message'>Message:</label>
        <textarea name="message" placeholder='What are you reaching out about?' rows={4}></textarea>

        <button className='btn secondary' type="submit">Send it</button>
      </form>
    </div>
  );
}