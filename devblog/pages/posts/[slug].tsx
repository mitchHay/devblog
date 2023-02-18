import md from 'markdown-it';
import { FrontMatterData } from '../../models/frontmatter';
import { getPosts, getTimeToRead, retrieveFrontMatter } from '../../services/posts.service';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/Post.module.scss';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

const FontAwesomeIcon = dynamic(() => import('@fortawesome/react-fontawesome').then(mod => mod.FontAwesomeIcon));
const SiteHead = dynamic(() => import('../../components/siteHead'));
const Image = dynamic(() => import('next/image'));

export default function Post({ frontmatter, content, shareUrl }: any) {
  const { title, description, author, category, date, bannerImage, tags } = frontmatter as FrontMatterData;
  const timeToRead = getTimeToRead(content);

  useEffect(() => {
    if (typeof(window) !== 'undefined') {
      hljs.highlightAll();
    }
  });

  const getShareUrl = () => {
    const path = useRouter().asPath;
    return `${shareUrl}${path}`;
  }

  return (
    <>
      <SiteHead 
        title={title + " | Mitchell Hayward"}
        description={description}
        ogImage={bannerImage}></SiteHead>
      <main className={styles.postMain}>
        <Image className={styles.postBanner} src={bannerImage} fill alt={`${title} banner`}/>
        <h1 className={styles.postTitle}>{title}</h1>
        <div className={styles.authorCard}>
          <span>Posted: { new Date(date).toDateString() }</span>
          <span>{ timeToRead } min read</span>
        </div>
        <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
        
        <button className={styles.postCopyLink}>
          <FontAwesomeIcon icon={faLink}/>
          <span>Share</span>
        </button>
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
