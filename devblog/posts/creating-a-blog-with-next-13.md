---
title: "Creating a blog with Next.js v13"
description: "Lets go on a journey of how I created this blog with Next.js v13. I'll cover things from the actual framework choice all the way through to the implementation."
author: "Mitchell Hayward"
category: "frontend"
date: "2023-02-18"
bannerImage: "/posts/nextjs13.png"
published: false
tags:
    - nextjs
    - react
    - typescript
---

Okay, so I'm kinda new at this blogging thing. Gonna do my best to do it justice, but much like software dev I can only hope that I get better with each iteration. Today I'm going to write a bunch of words about how I created this blog. More specifically, how I made it in my chosen tech stack (spoiler alert, it's Next.js).

## Why next?

I have to admit, before choosing next I did a whole bunch of research on javascript frameworks that can generate static websites. This vs. that, that vs. this... whatever that's not the point. I came to choose next because it has an array of features that set me up for success vs. some of the other frameworks (and personal preferences). Let me break down my thought process a little:

### What do I want to learn?

I've really been curious about React and static site generation for a little while now. I've predominantly only ever used Vue and Angular so I wanted to use this site as an opportunity to expand my knowledge base and learn something new (which is always fun!).

### What's popular?

Another key factor for me is to consider what is currently popular. I do like to form my own opinions of course, but a frameworks popularity can narrow down a bit of the selection process. Why? Things like community support are super important (to me at least) so I know I have a support network behind me in case I hit a roadblock, or I need to extend the framework to add certain functionality; with a larger community it's increasingly likely that an npm package would exist with the functionality I would require (e.g. dynamic sitemap generation). A thriving community also means more features and bugfixes (assuming the framework is open source). More of that makes for a happy Mitchy.

### Pull the numbers up!

As you can see here, it comes as no surprise that Next.js is at the top of the pile when it comes to frontend rendering framework usage in 2022 (chart taken from the recently published [stateofjs 2022 survey](https://2022.stateofjs.com/en-US/libraries/rendering-frameworks/)). Why? Well Next.js has long been known as a super popular React based rendering framework that supports static site generation, and server-side rendering. It's intuitive, quick to pick up, and highly extensible.

#### Rendering framework usage over time

![State of JS 2022 survey - rendering framework usage chart](/posts/sojs_2022.png)

### The decision

Okay, okay I took you on a little bit of my thought journey there. Hopefully it made it a little obvious as to why I chose Next.js as my blogs frontend framework. If not here's it in dotpoint form, after all who doesn't love a good list.

- Next.js is a React based framework (I want to learn React) ✅
- Next.js offers static site generation (SSG, we're fancy lets use the acronym) ✅
- Next.js has a huge community behind it (98.7k stars on Github - they've got some clout) ✅
- Next.js is also heavily supported by Vercel (the peeps who maintain it) ✅

#### Some considerations

- Next.js isn't the most performant SSG framework out there (but we can work with that) ⚠️
- Next.js (as of writing this blog post) just released v13, which adds a bunch of optimisations and improvements 🥳
- Next.js uses CSS modules, which is new to me 🆕

#### Honourable mentions

Lets shed some light on some pretty cool SSG frontend frameworks:

- Gatsby
    - A great, super performant SSG framework; leans heavily into GraphyQL if that tickles your fancy (strongly encouraged by the dev team as a best practice to follow).
- Astro
    - Designed to ship with absolutely zero JS out of the box. Again another super performant framework, however only went 1.0 a few months ago so won't have a large community or high level of maturity yet
- Qwik
    - Uses the concept of resumability to make your app instantly interactive (zero hydration required). Also React-dev friendly (the team use the phrase "you know React, you know Qwik"). Only just went into beta state, so not quite something I'd consider building my site on just yet. I'm super interested to see how this framework matures.
- Hugo
    - The worlds fastest SSG framework. Written in Go with its own templating system. Has a vast array of web templates to choose from. To be honest, I quite enjoy how Hugo works and how easy it is to create/structure new content... but on the other hand don't quite have the appetite to play around with the templating syntax.

## Creating the Next.js app

Alrighty, now we've gone over the why how about we cut straight to the chase and start cutting some code (yay).

Now creating a Next.js app is super simple, thanks to the team over at Vercel we can spin up a Next.js skeleton app pretty quick via:

```shell
npx create-next-app@latest --typescript
```

Boom. We're in business.

![Very nice we have a next.js app](https://media.tenor.com/rbsk4-L0u9gAAAAM/joinharudimaciel.gif)

Hold on, it's not home time yet!

Now lets get to tinkering. Obviously the first thing we're going to do is bin all of the `index.tsx` code so we have a clean slate. Once we've done that, we can shift focus onto building the core functionality of the site, the blog!

### Why does my matter have a front

We're going to be using the wonderful frontmatter pattern to build our content for this blog. Why? Well there are a couple of reasons:

- Frontmatter is relatively easy to understand
- ~~Frontmatter has a cool name~~
- Frontmatter is extensible
- We don't need no fancy CMS

So what exactly is frontmatter? I'm not going to lie to any of you, I had no idea what a frontmatter was until setting out a side-quest to build this blog. Let me give you the tldr;

Frontmatter is a pattern that allows you to associate metadata to a content type (in this case, our blog posts - which are stored in markdown format). That's it. Basically for us, Markdown with metadata.

Wait, why do we need metadata? Well to store certain information about the content we're writing. For instance our title, the author, the date the content was written... you get my drift.

#### Implementing frontmatter

First lets build out a super basic blog post in the frontmatter pattern. How about we be sensible developers and store our content somewhere organised. Create a new folder and call it posts (your directory structure should look like `./yourapp/posts`). 

##### my-post.md

```
---
title: "My post"
author: "You"
date: "2023-01-01"
bannerImage: "/our-post-image.png"
---

## Content

Some lorem ipsum stuff if you want...
```

Pat yourself on the back, we got some content!

### Pulling in our content

Lets create a service to actually read the content we've stored in the `/posts` directory.

We're going to need the help of the interwebs on this one... what do I mean? Our good ole pal npm. To actually parse the frontmatter data, we're going to use the [gray matter](https://github.com/jonschlinkert/gray-matter) package. This thing works wonders, and is used by the folk at Netlify, Gatsby, and Shopify (to name a few). What does it do? Well quite simply it parses frontmatter data from a string or file (exactly our use case!).

Lets work our magic and create the `posts.service.ts` file to parse frontmatter data from one of our markdown files.

##### posts.service.ts

```typescript
import { readFileSync } from "fs";
import matter from "gray-matter";
import path from "path";
import { FrontMatter, FrontMatterData } from "../models/frontmatter"; // Optional typings

const retrieveFrontMatter = (postFileName: string): FrontMatter => {
  const fileContents = readFileSync(path.join("posts", postFileName), 'utf8');
  const result = matter(fileContents);

  return {
    data: result.data as FrontMatterData, // Our frontmatter data
    content: result.content // Our markdown content
  };
}

export {
  retrieveFrontMatter
};
```

Another pat on the back, we can retrieve/parse frontmatter data now!

### Building a blog page

Alrighty now we've setup our foundations, how about we build our `blog.tsx` page. To do this, simply create a new file under the `/pages` directory and make sure you call it `blog.tsx` as Next.js has a file based routing system (it'll use the file name as the route).

Now we've done that, we're going to need to go back to our `posts.service.ts` file and add another method to extract ALL of the posts we've ever written. Like so:

##### posts.service.ts

```typescript
import { readdirSync, readFileSync } from "fs";

const getPosts = (): string[] => {
  return readdirSync("posts");
}

...

export {
  getPosts,
  retrieveFrontMatter
};
```

Lets go implement that in our newly created `blog.tsx` page. As we're building a static-site, you're going to need to use the `getStaticProps` function to pull the data at build/export time. This function will only ever get called when you are running `next dev`, `next serve`, `next build`, and `next export` commands, it will never ship to the browser as it is used to build our static blog page. That's it. Let's write some code that will pull our blog posts slug (name) and data.

##### blog.tsx

```tsx
export async function getStaticProps() {
  const blogPosts: Post[] = [];
  getPosts().forEach(file => {
    // Assign the slug
    const slug = file.replace(".md", "");
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
```

With that done, we can now start building out our page template!

##### blog.tsx

```tsx
export default function Blog({ posts }: any) {
  return (
    <>
      <main>
        <h1>Blog posts</h1>
        {
          !!posts &&
          posts.map((post: Post, index: number) => {
            const { slug, frontmatter } = post;
            const { title, author, date, bannerImage } = frontmatter.data;

            return (
              <Link href={`/posts/${slug}`} key={index}>
                <Image src={bannerImage} alt="Alt text"></Image>
                <h2>{title}</h2>
                <h3>{author}</h3>
                <span>{new Date(date).toLocaleDateString()}</span>
              </Link>
            )
          })
        }
      </main>
    </>
  )
}
```

Nice one! Lets test that worked by heading to `<your-localhost-url>/blog`. With any luck, you should see the title of the markdown file you created at the start of this blog post (My post) with a href set to `<your-localhost-url>/posts/your-post`.

### Building a post page


