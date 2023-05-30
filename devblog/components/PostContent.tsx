'use client';

import { default as md } from 'markdown-it';
import { useEffect } from 'react';
import { highlightAll } from '../services/hljs.service';

// Highlight js theme
import 'highlight.js/styles/github-dark.css';

// Component styles
import styles from '../styles/components/PostContent.module.scss';

export type PostContentProps = {
  content: string
};

export default function PostContent(props: PostContentProps): React.ReactElement {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    if (typeof(window) !== 'undefined') {
      highlightAll();

      const preBlocks = document.querySelectorAll('pre');
      preBlocks.forEach(preBlock => {
        const copyCodeButton = document.createElement('button');
        copyCodeButton.className = styles.copyCodeBtn;
        copyCodeButton.onclick = () => {
          const content = preBlock.innerText;
          copyToClipboard(content);
  
          const notification = document.getElementById('post-notification');
          if (!notification) {
            return;
          }
  
          notification.style.transform = 'scale(1)';
          notification.textContent = 'Copied to clipboard';
  
          setTimeout(() => {
            notification.style.transform = 'scale(0)';
          }, 2500);
        }
  
        preBlock.appendChild(copyCodeButton);
      });
    }
  })

  return (
    <>
      <span className={styles.notification} id='post-notification' />
      <div className={styles.postContent}
          dangerouslySetInnerHTML={{ __html: md().render(props.content) }} />
    </>
  )
}