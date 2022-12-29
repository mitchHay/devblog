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

### Next vs. Gatsby

This framework caught my attention initially as there was a bit of chatter about it at my workplace. So naturally as all devs do, I did some googling to see what it was all about. For me there were a couple of key things that kept me away from Gatsby:

- Its usage of GraphQL seemed unneccessary for what I'm trying to achieve (a pretty simple static website). While it's not required to use GraphQL, it is strongly encouraged by the dev team as a best practice to follow. It may sound a bit short-sighted but the benefit of using GraphQL for my blog didn't really seem to match up with the performance gains (we'll get into the numbers later).

### Next vs. Astro

Astro was hot off the press into its 1.0 release whilst I was building this site. There is some super cool stuff packed into this framework, as well as the performance gains it's able to achieve via Islands architecture. So, why not Astro? Well I really wanted to delve into a framework that can do a bit more than static site generation, and Next does just that handling SSR as well - so I should have my bases covered if I build any other apps in the future that deal with dynamic data.

### Next vs. Qwik

Gotta be honest I didn't hear about Qwik until I had already begun development in Next.js. Qwik looks pretty promising and boasts a whole bunch of mad performance gains (I mean of course it does, since it comes from the team behind Playground and builder.io). This one is on my list to look into later on, so keep an eye out for a blog post as I'll post my developer experience. My main reason for not picking up Qwik for this site is because it is still currently in beta state.