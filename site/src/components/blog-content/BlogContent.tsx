import { Input } from '../input/Input';
import type { CollectionEntry } from 'astro:content';
import { useState } from 'react';
import { Card } from '../card/Card';
import { FormattedDate } from '../formatted-date/FormattedDate';

// Assets
import searchIcon from "../../assets/icons/search.svg";

// Styles
import './BlogContent.scss';

type BlogPost = CollectionEntry<'blog'>;
interface BlogContentProps {
  posts: BlogPost[];
}

export const BlogContent = ({ posts }: BlogContentProps): React.ReactNode => {
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(posts);
  const handleSearchInput = (query: string) => {
    if (!query) {
      setFilteredPosts(posts);
      return;
    }

    const loweredQuery = query.toLowerCase();
    setFilteredPosts(
      filteredPosts.filter((p) =>
        p.data.title.toLowerCase().includes(loweredQuery) ||
        p.data.tags?.some((t) => t.toLowerCase().includes(loweredQuery)) ||
        p.data.description.toLowerCase().includes(loweredQuery)
      )
    );
  }

  return (
    <>
      <div className="blog-title">
        <h1>Posts</h1>
        <Input
          placeholder="Search posts..."
          label="Search posts"
          id="search-posts"
          onChange={(e) => handleSearchInput(e.target.value)}
          image={{
            src: searchIcon,
            altText: "Search icon",
            id: "input-search",
          }}
        />
      </div>

      <div className="posts-container">
        {
          filteredPosts
            .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
            .map((post) => (
              <Card
                key={post.id}
                imgSrc={post.data.heroImage ?? ""}
                title={post.data.title}
                href={`/blog/${post.id}`}
              >
                <FormattedDate date={post.data.pubDate} />
                <p>{post.data.description}</p>
              </Card>
            ))
        }
      </div>
    </>
  );
}