import md from 'markdown-it';
import { FrontMatterData } from '../../models/frontmatter';
import { getPosts, getTimeToRead, retrieveFrontMatter } from '../../services/posts.service';
import styles from '../../styles/Post.module.scss';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

const SiteHead = dynamic(() => import('../../components/SiteHead'));
const FadeIn = dynamic(() => import('../../components/FadeIn'));
const Image = dynamic(() => import('next/image'));

export default function Post({ frontmatter, content, shareUrl }: any) {
  const { title, description, author, category, date, bannerImage, tags } = frontmatter as FrontMatterData;
  const timeToRead = getTimeToRead(content);
  const path = useRouter().asPath;
  
  shareUrl = `${shareUrl}${path}`

  useEffect(() => {
    if (typeof(window) !== 'undefined') {
      hljs.highlightAll();
    }

    let preBlocks = document.querySelectorAll('pre');
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
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <SiteHead 
        title={title + " | Mitchell Hayward"}
        description={description}
        ogImage={bannerImage}></SiteHead>
      <main className={styles.postMain}>
        <span className={styles.notification} id='post-notification'></span>
        <Image className={styles.postBanner} src={bannerImage} fill alt={`${title} banner`}/>
        <h1 className={styles.postTitle}>{title}</h1>
        <div className={styles.authorCard}>
          <span>Posted: { new Date(date).toDateString() }</span>
          <span>{ timeToRead } min read</span>
        </div>

        <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
        
        <FadeIn>
          <button className={styles.postCopyLink} onClick={() => { 
            copyToClipboard(shareUrl);
            
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
            <span id='share-btn'>Share</span>
          </button>
        </FadeIn>
      </main>
    </>
  )
}

export async function getStaticPaths() {
  const paths = getPosts().map((fileName) => ({
    params: {
      slug: fileName.replace('.md', '')
    }
  }));

  return {
    paths: paths,
    fallback: false
  }
}

export async function getStaticProps({ params: { slug } }: any) {
  const { data, content } = retrieveFrontMatter(`${slug}.md`);

  return {
    props: {
      frontmatter: data,
      content: content,
      shareUrl: process.env.SITE_URL 
    }
  }
}
