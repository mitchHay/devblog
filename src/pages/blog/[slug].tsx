import md from 'markdown-it';
import { FrontMatterData } from '../../models/frontmatter';
import { getPosts, getTimeToRead, retrieveFrontMatter } from '../../services/posts.service';
import styles from '../../styles/Post.module.scss';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { highlightAll } from '../../services/hljs.service';
import 'highlight.js/styles/github-dark.css';

const SiteHead = dynamic(() => import('../../components/SiteHead'));
const FadeIn = dynamic(() => import('../../components/FadeIn'));
const Image = dynamic(() => import('next/image'));

function generatePostedDate(date: Date) {
  const now = new Date();
  const diff = Math.floor(now.getTime() - date.getTime());
  const day = 1000 * 60 * 60 * 24;

  const days = Math.floor(diff / day);
  if (days < 7) {
    return `${days} days ago`;
  }

  const weeks = Math.floor(days / 7);
  if (weeks < 4) {
    return `${weeks} weeks ago`;
  }

  const months = Math.floor(days / 31);
  if (months < 12) {
    return `${months} months ago`;
  }

  const years = Math.floor(months / 12);
  return `${years} years ago`;
}

export default function Post({ frontmatter, content, shareUrl }: any) {
  const { title, description, author, category, date, bannerImage, tags } = frontmatter as FrontMatterData;
  const timeToRead = getTimeToRead(content);
  const path = useRouter().asPath;
  
  shareUrl = `${shareUrl}${path}`;

  useEffect(() => {
    if (typeof window !== 'undefined') {
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
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <SiteHead 
        title={title + " | Mitchell Hayward"}
        description={description}
        ogImage={bannerImage} />

      <main className={styles.postMain}>
        <span className={styles.notification} id='post-notification'></span>
        <Image 
          className={styles.postBanner} 
          src={bannerImage} 
          fill={true}
          alt={`${title} banner`}
          priority={true}
          loading='eager'
          placeholder='blur'
          sizes='100vw' />
        <h1 className={styles.postTitle}>{title}</h1>
        <div className={styles.authorCard}>
          <span>Posted: { generatePostedDate(new Date(date)) }</span>
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
      shareUrl: process.env.SITE_URL ?? ''
    }
  }
}
