# rmj.io

This is the repo of my personal site and blog. It's built with
[Astro](https://astro.build), with React for the interactive pages (regex and
takuzu) and Tailwind for styling.

## Development

Tool versions are managed with [mise](https://mise.jdx.dev).

```sh
mise install
pnpm install
pnpm start # dev server on http://localhost:5123
pnpm build # production build into build/
pnpm lint
pnpm typecheck
```

## Writing a post

Posts are Markdown files in `src/content/posts/`. The file name becomes the URL
(`/blog/posts/<file-name>/`).

```md
---
title: My Post
description: >-
  A sentence or two that shows up in the post list and in link previews.
date: 2026-10-12T10:00:00-07:00
tags:
- Go
image: /blog/images/my-post/og.png # optional, 1200x600
---

Post content goes here.
```

The date needs a time and offset. Add `draft: true` to keep a post out of the
build while you work on it (drafts still show up in the dev server).

Images go in `public/blog/images/<post>/` and are referenced as
`/blog/images/<post>/<file>`.
