'use client';

import styles from '../styles/components/Posts.module.scss';
import dynamic from "next/dynamic";
import { Post } from "../models/post";
import { getFontClass } from "../services/fonts.service";
import { useState } from 'react';

const FadeIn = dynamic(() => import('../components/FadeIn'));
const Link = dynamic(() => import('next/link'));
const Image = dynamic(() => import('../components/Image'));
const Select = dynamic(() => import('../components/Select'));

export type PostsProps = {
  posts: Post[]
};

export default function Posts({posts}: PostsProps): React.ReactElement {
  const options = ['Latest', 'Ascending (A-Z)', 'Descending (Z-A)'];
  const [blogPosts, setBlogPosts] = useState(posts);

  function sort(option: string): void {
    switch (option) {
      case 'Latest':
        setBlogPosts(
          structuredClone(posts).sort((a, b) => {
            return new Date(b.frontmatter.data.date).valueOf() - new Date(a.frontmatter.data.date).valueOf()
          })
        );
        break;
      case 'Ascending (A-Z)':
        setBlogPosts(
          structuredClone(posts).sort((a, b) => {
            return a.frontmatter.data.title.localeCompare(b.frontmatter.data.title)
          })
        );
        break;
      case 'Descending (Z-A)':
        setBlogPosts(
          structuredClone(posts).sort((a, b) => {
            return b.frontmatter.data.title.localeCompare(a.frontmatter.data.title)
          })
        );
        break;
    }
  }

  return (
    <>
      <FadeIn className={styles.blogSubtitle}>
        <h2>My Posts</h2>
        <Select 
          className={styles.blogFilter}
          id='test-select'
          placeholder='Sort'
          options={options} 
          onSelect={(option) => sort(option)}/>
      </FadeIn>
      {
        !!blogPosts &&
        blogPosts.map((post: Post, index: number) => {
          const { slug, frontmatter } = post;
          const { title, author, published, date, bannerImage, tags } = frontmatter.data;

          if (!published && process.env.NODE_ENV !== 'development') {
            return;
          }

          return (
            <FadeIn className={styles.blogLinkContainer} key={index}>
              <Link href={`/blog/posts/${slug}`} className={styles.blogLink}>
                <Image src={bannerImage}
                  width={200} height={100}
                  alt={`${title} thumbnail`} />
                <div className={styles.blogBlurb}>
                  {
                    process.env.NODE_ENV === 'development' && !published &&
                    <span className={styles.draftTag}>Draft</span>
                  }
                  <div className={styles.blogHeadingContainer}>
                    <h2>{title}</h2>
                  </div>
                  <h3>{author}</h3>
                  <span className={getFontClass('Josefin Sans')}>{date}</span>
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
            </FadeIn>
          )
        })
      }
    </>
  );
} 