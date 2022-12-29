import { Post } from '../models/post';
import { getPosts, retrieveFrontMatter } from "../services/posts.service";
import styles from '../styles/Blog.module.scss';
import dynamic from "next/dynamic";
import { useEffect } from 'react';

const Link = dynamic(() => import('next/link'));
const Image = dynamic(() => import('next/image'));

export default function Blog({ posts }: any) {
  useEffect(() => {
    if (typeof(window) !== 'undefined') {
      const searchInput = document.getElementById('blog-search');
  
      document.addEventListener('keydown', (keypress) => {
        switch (keypress.key) {
          case '/':
            keypress.preventDefault();
            searchInput?.focus({
              preventScroll: false
            });
  
            break;
          case 'Escape':
            keypress.preventDefault();
            searchInput?.blur();
  
            break;
        }
      });
    }
  });

  return (
    <main className={styles.blogMain}>
      <h1 className={styles.pageTitle}>Welcome to My Thoughtspace 💭</h1>
      <input className={styles.blogSearch} 
             id='blog-search' 
             placeholder='Press / to search for a post...'>
      </input>
      <div className={styles.postFilters}>
        <label htmlFor='postSort'>Sort by:</label>
        <select name='postSort'>
          <option>Most Recent</option>
        </select>
      </div>
      {
        !!posts &&
        posts.map((post: Post, index: number) => {
          const { slug, frontmatter } = post;
          const { title, author, category, date, bannerImage, tags } = frontmatter.data;

          return (
            <Link href={`/posts/${slug}`} key={index} className={styles.blogLink}>
              <Image src={bannerImage}
                width={200} height={100}
                alt={`${title} thumbnail`}>
              </Image>
              <div className={styles.blogBlurb}>
                <div className={styles.blogHeadingContainer}>
                  <h2>{title}</h2>
                </div>
                <h3>{author}</h3>
                <h4>{new Date(date).toLocaleDateString()}</h4>
                <div className={styles.postTags}>
                  {
                    tags.map((tag, index) => {
                      return (
                        <small key={index} className={styles.postTag}>{tag}</small>
                      )
                    })
                  }
                </div>
              </div>
            </Link>
          )
        })
      }
    </main>
  )
}

export async function getStaticProps() {
  const blogPosts: Post[] = [];
  getPosts().forEach(file => {
    // Assign the slug
    const slug = file.replace('.md', '');
    const fm = retrieveFrontMatter(file);

    // Map to the blogPosts array
    blogPosts.push({
      slug: slug,
      frontmatter: fm
    });
  });

  return {
    props: {
      posts: blogPosts
    }
  }
}