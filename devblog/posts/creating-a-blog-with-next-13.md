---
title: "Creating a blog with Next.js v13"
author: "Mitchell Hayward"
category: "frontend"
date: "2022-12-28"
bannerImage: "/posts/nextBlogPostImg.png"
published: false
tags:
    - nextjs
    - javascript
---

Okay, so I'm kinda new at this blogging thing. Gonna do my best to do it justice, but much like software dev I can only hope that I get better with each iteration. Today I'm going to write a bunch of words about how I created this blog. More specifically, how I made it in my chosen tech stack (spoiler alert, it's next.js).

## Why next?

I have to admit, before choosing next I did a whole bunch of research on javascript frameworks that can generate static websites. This vs. that, that vs. this... whatever that's not the point. I came to choose next because it has an array of features that set me up for success vs. some of the other frameworks. Let me break down my thought process a little:

### Next vs. Gatsby

This framework caught my attention initially as there was a bit of chatter about it at my workplace. So naturally as all devs do, I did some googling to see what it was all about. For me there were a couple of key things that kept me away from Gatsby:

- Its usage of GraphQL seemed unneccessary for what I'm trying to achieve (a pretty simple static website). While it's not required to use GraphQL, it is strongly encouraged by the dev team as a best practice to follow. It may sound a bit short-sighted but the benefit of using GraphQL for my blog didn't really seem to match up with the performance gains (we'll get into the numbers later).

### Next vs. Astro

Astro was hot off the press into its 1.0 release whilst I was building this site. There is some super cool stuff packed into this framework, as well as the performance gains it's able to achieve via Islands architecture. So, why not Astro? Well I really wanted to delve into a framework that can do a bit more than static site generation, and Next does just that handling server side rendering as well - so I should have my bases covered if I build any other apps in the future that deal with state. Other than that, if you are building a purely static site - astro or Qwik are definitely worth looking into.

### Next vs. Qwik

Gotta be honest I didn't hear about Qwik until I had already begun development in Next.js. Qwik looks pretty promising and boasts a whole bunch of mad performance gains (I mean of course it does, since it comes from the team behind Playground and builder.io). This one is on my list to look into later on, so keep an eye out for a blog post as I'll post my developer experience. So why didn't I choose Qwik? tldr; it's still in beta, and although the team have encouraged production use I've opted to go for Next.js for the greater community support and maturity (as of writing this post).

## Creating the Next.js app

Now this one is super simple, thanks to the team over at Vercel (the peeps who maintain Next.js) we can boot up a Next.js app template pretty quick via:

```shell
npx create-next-app@latest --typescript
```

Boom. We're in business.

![very nice we have a next app](https://media.tenor.com/rbsk4-L0u9gAAAAM/joinharudimaciel.gif)
