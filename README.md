# Snowbellows p5js Template

## Overview

A simple template for making a p5js (<https://p5js.org/>) sketch using Snowpack and Typescript. This is my favourite setup and familiar to me as a Frontend Developer, if you just want to get going without worrying about your local development environment <https://editor.p5js.org/> is a great place to start.

I like this set up for the following reasons:

- I can use a local development environment I'm used to
- Typescript offers excellent autocomplete and error messages through VS Code (my IDE)
- Snowpack gives quick hotreloading which allows me to "instantly" see changes I make in the b

## Prerequisites

You will need local installs of nodejs and npm. I recommend using nvm (<https://github.com/nvm-sh/nvm>) which allows you to install and manage multiple versions at once.

I use the latest LTS verson of node which on my machine at time of writing is `v14.16.1 (npm v6.14.12)`, I'll try and bump this in the readme for major versions but you should be able to use anything later than `v10` I'm just telling you what I'm currently working with.

Then clone this repo using git and run

```sh
npm install
```

## Development

To work on your sketch run the dev server using:

```sh
npm run start
```

This will start the local development server on `http://localhost:8080/`.

Then open up `src/index.ts` in your favourite editor and add your code to the `setup` and `draw` functions:

```js
p.setup = () => {
  p.createCanvas(window.innerWidth, window.innerHeight);
  p.background(200);
};

p.draw = () => {
  p.circle(50, 50, 50);
};
```

Save the file and you'll see the page at `http://localhost:8080/` automatically refresh with your changes!

For more information on p5js and all the tools you can use to make your sketch see the excellent tutorials at <https://p5js.org/get-started/>.

## Build and Deployment

Building and deploying your sketch for other people to see is really beyond the scope of this README. In my experience I rarely want to just serve the full page sketch from here as is but it is possible.

To build as is using Snowpack run the following in your terminal:

```sh
npm run build
```

This will compile your Typescript and dependencies into an html file and bundle in the `build` directory.

Just opening the html file in your browser at this stage simply won't work it needs to be served over HTTP. You can do this locally using something like <https://github.com/http-party/http-server> or you can deploy it online using whatever webhosting provider you like. If you're a frontend developer like me you might like <https://www.netlify.com/> if you haven't already heard of it.

## Troubleshooting Problems

Honestly I'm just making this for myself and expect anyone who might want to use it to to be more than capable of troubleshooting they're own problems but you're welcome to contact me via alexhalverson@posteo.net or @snowbellows on Twitter if you have any issues or would just like to chat about p5js and generative art/creative coding more generally.

Have Fun!
