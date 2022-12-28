---
title: "Creating a blog with Next.js v13"
author: "Mitchell Hayward"
category: "frontend"
date: "2022-12-28"
bannerImage: "/posts/nextBlogPostImg.png"
tags:
    - nextjs
    - javascript
---

Okay, so I'm kinda new at this blogging thing. Gonna do my best to do it justice, but much like software dev I can only hope that I get better with each iteration. Today I'm going to write a bunch of words about how I created this blog. More specifically, how I made it in my chosen tech stack (spoiler alert, it's next.js).

## Why next?

I have to admit, before choosing next I did a whole bunch of research on javascript frameworks that can generate static websites. This vs. that, that vs. this... whatever that's not the point. I came to choose next because it has an array of features that set me up for success vs. some of the other frameworks. Let me break down my thought process a little:

- Next vs. Gatsby

    This framework caught my attention initially as there was a bit of chatter about it at my workplace. So naturally as all devs do, I did some googling to see what it was all about. For me there were a couple of key things that kept me away from Gatsby:

    - Its usage of GraphQL seemed unneccessary for what I'm trying to achieve (a pretty simple static website). While it's not required to use GraphQL, it is strongly encouraged by the dev team as a best practice to follow. It may sound a bit short-sited but the benefit of using GraphQL for my blog didn't really seem to match up with the performance gains (we'll get into the numbers later).

- Next vs. Astro
- Next vs. Qwik

```javascript
import 'path' from 'path';

function doSomething() {
    path.join('../', 'hey');
}
```