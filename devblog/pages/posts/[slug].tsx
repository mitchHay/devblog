import md from 'markdown-it';
import { FrontMatterData } from '../../models/frontmatter';
import { getPosts, retrieveFrontMatter } from '../../services/posts.service';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/Post.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

const TwitterShareButton = dynamic(() => import('react-share').then(mod => mod.TwitterShareButton));
const TwitterIcon = dynamic(() => import('react-share').then(mod => mod.TwitterIcon));
const FacebookShareButton = dynamic(() => import('react-share').then(mod => mod.FacebookShareButton));
const FacebookIcon = dynamic(() => import('react-share').then(mod => mod.FacebookIcon));
const LinkedinShareButton = dynamic(() => import('react-share').then(mod => mod.LinkedinShareButton));
const LinkedinIcon = dynamic(() => import('react-share').then(mod => mod.LinkedinIcon));
const RedditShareButton = dynamic(() => import('react-share').then(mod => mod.RedditShareButton));
const RedditIcon = dynamic(() => import('react-share').then(mod => mod.RedditIcon));

export default function Post({ frontmatter, content, shareUrl }: any) {
  const { title, author, category, date, bannerImage, tags } = frontmatter as FrontMatterData;

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
    <main className={styles.postMain}>
      <h1 className={styles.postTitle}>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
      
      <button className={styles.postCopyLink}>
        <FontAwesomeIcon icon={faLink}/>
        <span>Share</span>
      </button>

      <div className={styles.postShare}>
        <TwitterShareButton url={getShareUrl()}>
          <TwitterIcon size={24} round={true}/>
        </TwitterShareButton>

        <LinkedinShareButton url={getShareUrl()}>
          <LinkedinIcon size={24} round={true}/>
        </LinkedinShareButton>

        <FacebookShareButton url={getShareUrl()}>
          <FacebookIcon size={24} round={true}/>
        </FacebookShareButton>

        <RedditShareButton url={getShareUrl()}>
          <RedditIcon size={24} round={true}/>
        </RedditShareButton>
      </div>
    </main>
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
