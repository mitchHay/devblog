import { Metadata, ResolvingMetadata } from 'next';
import { FrontMatterData } from '../../../../models/frontmatter';
import { getPosts, getTimeToRead, retrieveFrontMatter } from '../../../../services/posts.service';
import styles from '../../../../styles/Post.module.scss';
import dynamic from 'next/dynamic';

const FadeIn = dynamic(() => import('../../../../components/FadeIn'));
const Image = dynamic(() => import('../../../../components/Image'));
const PostContent = dynamic(() => import('../../../../components/PostContent'));
const ShareButton = dynamic(() => import('../../../../components/ShareButton'));

export async function generateMetadata(
  { params }: any,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = params;
  const { data } = retrieveFrontMatter(`${slug}.md`);
  const { title, description, bannerImage } = data;
 
  const previousImages = (await parent).openGraph?.images || [];
 
  return {
    title: title,
    description: description,
    openGraph: {
      images: [bannerImage, ...previousImages],
    },
  };
}

export default function Post({ params }: any) {
  const { slug } = params;
  const { frontmatter, content, shareUrl } = getData(slug);

  const { title, description, author, category, date, bannerImage, tags } = frontmatter as FrontMatterData;
  const timeToRead = getTimeToRead(content);

  return (
    <>
      <main className={styles.postMain}>
        <Image 
          className={styles.postBanner} 
          src={bannerImage} 
          fill={true}
          alt={`${title} banner`}
          priority={true}
          loading='eager'
          placeholder='blur'
          sizes='70vw' />
        <h1 className={styles.postTitle}>{ title }</h1>
        <div className={styles.authorCard}>
          <span>Posted: { new Date(date).toDateString() }</span>
          <span>{ timeToRead } min read</span>
        </div>

        <PostContent content={content} />
        
        <FadeIn>
          <ShareButton text='Share' baseUrl={shareUrl} />
        </FadeIn>
      </main>
    </>
  )
}

export async function generateStaticParams() {
  const posts = getPosts().map((fileName) => ({
    slug: fileName.replace('.md', '')
  }));

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

function getData(slug: string) {
  const { data, content } = retrieveFrontMatter(`${slug}.md`);

  return {
    frontmatter: data,
    content: content,
    shareUrl: process.env.SITE_URL ?? ''
  }
}
