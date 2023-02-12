---
title: "Creating a blog with Next.js v13"
author: "Mitchell Hayward"
category: "frontend"
date: "2023-01-08"
bannerImage: "/posts/nextjs13.png"
published: false
tags:
    - nextjs
    - react
    - frontend
---

Okay, so I'm kinda new at this blogging thing. Gonna do my best to do it justice, but much like software dev I can only hope that I get better with each iteration. Today I'm going to write a bunch of words about how I created this blog. More specifically, how I made it in my chosen tech stack (spoiler alert, it's Next.js).

## Why next?

I have to admit, before choosing next I did a whole bunch of research on javascript frameworks that can generate static websites. This vs. that, that vs. this... whatever that's not the point. I came to choose next because it has an array of features that set me up for success vs. some of the other frameworks (and personal preferences). Let me break down my thought process a little:

### What do I want to learn?

I've really been curious about React and static site generation for a little while now. I've predominantly only ever used Vue and Angular so I wanted to use this site as an opportunity to expand my knowledge base and learn something new (which is always fun!).

### What's popular?

Another key factor for me is to consider what is currently popular. I do like to form my own opinions of course, but a frameworks popularity can narrow down a bit of the selection process. Why? Things like community support are super important (to me at least) so I know I have a support network behind me in case I hit a roadblock, or I need to extend the framework to add certain functionality; with a larger community it's increasingly likely that an npm package would exist with the functionality I would require (e.g. dynamic sitemap generation). A thriving community also means more features and bugfixes (assuming the framework is open source). More of that makes for a happy Mitchy.

### Pull the numbers up!

As you can see here, it comes as no surprise that React is at the top of the pile when it comes to frontend framework usage (bearing in mind we're using the stateofjs numbers from last year as 2023's hasn't been released as of writing this blog post).

#### Frontend Framework usage over time

![State of JS 2022 survey](/posts/sojs_2022.png)

### The decision

Okay, okay I took you on a little bit of my thought journey there. Hopefully it made it a little obvious as to why I chose Next.js as my blogs frontend framework. If not here's it in dotpoint form, after all who doesn't love a good list.

- Next.js is a React based framework ✅
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

