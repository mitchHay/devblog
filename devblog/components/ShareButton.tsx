'use client';

import { copy } from "../services/clipboard.service";

// Component styles
import styles from "../styles/components/ShareButton.module.scss";
import { usePathname } from "next/navigation";

export type ShareButtonProps = {
  baseUrl: string,
  text: string
};

export default function ShareButton(props: ShareButtonProps): React.ReactElement {
  const path = usePathname();
  const shareableUrl = `${props.baseUrl}${path}`;

  return (
    <button className={styles.postCopyLink} onClick={() => { 
      copy(shareableUrl);
      
      const shareBtn = document.getElementById('share-btn');
      if (!shareBtn || shareBtn?.innerText.includes('link')) {
        return;
      }

      const originalBtnText = shareBtn.innerText;
      shareBtn.innerText = 'Copied link';

      setTimeout(() => {
        shareBtn.innerText = originalBtnText;
      }, 2500);
    }}>
      <img src='/images/icon-share.svg' width={14} height={14} loading='lazy'/>
      <span id='share-btn'>{ props.text }</span>
    </button>
  );
}
