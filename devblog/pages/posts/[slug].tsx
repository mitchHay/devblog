import md from 'markdown-it';
import { FrontMatterData } from '../../models/frontmatter';
import { getPosts, retrieveFrontMatter } from '../../services/posts.service';
import styles from '../../styles/Post.module.scss';

export default function Post({ frontmatter, content }: any) {
  const { title, author, category, date, bannerImage, tags } = frontmatter as FrontMatterData;

  return (
    <main className={styles.postMain}>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
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
