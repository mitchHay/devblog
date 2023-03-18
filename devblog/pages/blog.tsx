import { Post } from '../models/post';
import { getPosts, retrieveFrontMatter } from "../services/posts.service";
import styles from '../styles/Blog.module.scss';
import dynamic from "next/dynamic";
import { useEffect } from 'react';
import { getFontClass } from '../services/fonts.service';

const Link = dynamic(() => import('next/link'));
const Image = dynamic(() => import('next/image'));
const SiteHead = dynamic(() => import('../components/siteHead'));
const LordIcon = dynamic(() => import('../components/lordIcon'));
const Select = dynamic(() => import('../components/select'));

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
    <>
      <SiteHead title={'Blog | Mitchell Hayward'}
        description={"Welcome to my thoughtspace! Here you'll find me talking about anything from front-end development, game development, or test automation."} />
      <main className={styles.blogMain}>
        <div className={styles.blogHero}>
          <LordIcon colors={{
              primary: '#0A0012',
              secondary: '#BD93F9'
          }} src={'rfbqeber.json'} height={150} width={150} trigger={'loop'} delay={'250'} />
          <div className={styles.blogHeroContent}>
            <h1 className={styles.pageTitle}>Welcome to My Thoughtspace</h1>
            <p className={styles.pageDescription}>
              Here you'll find a library of my (hopefully) many thoughts. I love to blog about anything really, but in particular you will find me blabbing about frontend development, game development, and test automation.
            </p>
            <p className={styles.contactCta}>Vibing with my content? <a href="/?contact">Reach out</a></p>
          </div>
        </div>
        <input className={styles.blogSearch} 
              id='blog-search' 
              placeholder='Press / to search for a post...'>
        </input>
        {/* <Select id="test-select" label="Test" options={["Option A", "Option B"]}></Select> */}
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
            const { title, author, category, published, date, bannerImage, tags } = frontmatter.data;

            if (!published && process.env.NODE_ENV !== 'development') {
              return;
            }

            return (
              <Link href={`/posts/${slug}`} key={index} className={styles.blogLink}>
                <Image src={bannerImage}
                  width={200} height={100}
                  alt={`${title} thumbnail`}>
                </Image>
                <div className={styles.blogBlurb}>
                  {
                    process.env.NODE_ENV === 'development' && !published &&
                    <span className={styles.draftTag}>Draft</span>
                  }
                  <div className={styles.blogHeadingContainer}>
                    <h2>{title}</h2>
                  </div>
                  <h3>{author}</h3>
                  <span className={getFontClass('Josefin Sans')}>{new Date(date).toLocaleDateString()}</span>
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
    </>
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