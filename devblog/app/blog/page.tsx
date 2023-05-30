import styles from '../../styles/Blog.module.scss';
import dynamic from 'next/dynamic';
import { Post } from '../../models/post';
import { openDialog } from '../../components/ContactModal';
import { getPosts, retrieveFrontMatter } from '../../services/posts.service';
import { Metadata } from 'next';

const Posts = dynamic(() => import('../../components/Posts'));
const LordIcon = dynamic(() => import('../../components/LordIcon'));
const FadeIn = dynamic(() => import('../../components/FadeIn'));
const ContactModal = dynamic(() => import('../../components/ContactModal'));
const SlashInput = dynamic(() => import('../../components/SlashInput'));

export const metadata: Metadata = {
  title: 'Blog | Mitchell Hayward',
  description: 'Welcome to my thoughtspace! Here you\'ll find me talking about anything from front-end development, game development, or test automation.'
};

export default function Blog() {
  const posts = getData().props.posts;

  return (
    <>
      <main className={styles.blogMain}>
        <ContactModal />

        <FadeIn className={styles.blogHero}>
          <LordIcon colors={{
              primary: '#0A0012',
              secondary: '#BD93F9'
          }} src={'rfbqeber.json'} height={150} width={150} trigger={'in-viewport'} delay={'250'} />
          <div className={styles.blogHeroContent}>
            <h1 className={styles.pageTitle}>My Thoughtspace 💭</h1>
            <p className={styles.pageDescription}>
              Welcome to my thoughtspace! Feel free to have a snoop! 
              I love to chat about anything really, but you'll mainly find me blabbing about frontend, game development, and test automation.
            </p>
          </div>
        </FadeIn>

        <FadeIn className={styles.blogSearchContainer}>
            <SlashInput className={styles.blogSearch}
                id='blog-search'
                placeholder='Press / to search for a post...'/>
            <p className={styles.contactCta}>Vibing with my content? <a className={styles.linkBtn} onClick={openDialog}>Reach out</a></p>
        </FadeIn>

        <Posts posts={posts} />

      </main>
    </>
  )
}

function getData() {
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