---
title: "Using MillionJS with NextJS"
description: "You may have heard of MillionJS being thrown around when talking about React. Lets see how we can implement a library that boasts a virtual DOM performance that is up to 70% faster than Reacts in NextJS."
author: "Mitchell Hayward"
category: "frontend"
date: "2023-06-12"
bannerImage: "/posts/millionjs.svg"
published: false
tags:
    - nextjs
    - react
    - typescript
    - millionjs
---

You may or may not have heard about this new JavaScript library being talked about recently. Fireship.io did a code report video on it and the Twitter world are raving about its performance boosts. What am I on about? MillionJS is a JavaScript library that boasts up to a 70% boost in performance VS. that of Reacts virtual DOM. Lets have a bit of a look into what on earth a virtual DOM is, and when/why you should use MillionJS on your NextJS (or React) site.

## What is a virtual DOM?

Okay, so a virtual DOM is...

## When should I use MillionJS?

So all of this stuff sounds pretty neat right? If I were you I'd be wondering, well when should I actually use MillionJS?

### Rules of the block

## How do I use MillionJS with NextJS?

### Setting up the million compiler

#### next.config.js

```js
const million = require('million/compiler');

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Your next config
};

module.exports = million.next(nextConfig);
```

### Creating your first block

#### Button.tsx

```tsx
import { block } from 'million/react';

function ButtonFn({text, type, onClick}: ButtonProps): React.ReactElement {
    return (
        <button className={`btn ${type}`} onClick={onClick}>{text}</button>
    )
}

const Button = block(ButtonFn);
export default Button;
```
