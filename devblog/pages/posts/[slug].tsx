import md from 'markdown-it';
import { FrontMatterData } from '../../models/frontmatter';
import { getPosts, retrieveFrontMatter } from '../../services/posts.service';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/Post.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import { useEffect } from 'react';

export default function Post({ frontmatter, content }: any) {
  const { title, author, category, date, bannerImage, tags } = frontmatter as FrontMatterData;

  useEffect(() => {
    if (typeof(window) !== 'undefined') {
      hljs.highlightAll();
    }
  });

  return (
    <main className={styles.postMain}>
      <h1 className={styles.postTitle}>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
      {/* TODO: Move to component */}
      <div className={styles.postShare}>
        <FontAwesomeIcon icon={faLink}/>
        <span>Share</span>
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
      content: content
    }
  }
}
