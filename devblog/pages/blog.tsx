import Link from "next/link";
import { Post } from '../models/post';
import Image from "next/image";
import { getPosts, retrieveFrontMatter } from "../services/posts.service";
import { fontClasses } from "../services/fonts.service";
import styles from '../styles/Blog.module.scss';

export default function Blog({posts}: any) {
    return (
        <main className={`${ styles.blogMain } ${ fontClasses() }`}>
            <h1 className={ styles.pageTitle }>Welcome to My Thoughtspace 💭</h1>
            {
                !!posts &&
                posts.map((post: Post, index: number) => {
                    const { slug, frontmatter } = post;
                    const { title, author, category, date, bannerImage, tags } = frontmatter.data;

                    return (
                        <Link href={ `/posts/${slug}` } key={ index } className={ styles.blogLink }>
                            <Image src={ bannerImage } 
                                   width={200} height={100} 
                                   alt={`${ title } thumbnail`}>
                            </Image>
                            <div>
                                <div className={styles.blogHeadingContainer}>
                                    <h2>{ title }</h2>
                                    <small className={ styles.blogCategory }>{ category }</small>
                                </div>
                                <h3>{ author }</h3>
                                <h4>{ new Date(date).toLocaleDateString() }</h4>
                                {
                                    tags.map((tag, index) => {
                                        return (
                                            <small key={ index }>{ tag }</small>
                                        )
                                    })
                                }
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