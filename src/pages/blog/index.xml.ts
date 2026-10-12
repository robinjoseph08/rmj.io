import rss               from '@astrojs/rss';
import type { APIRoute } from 'astro';

import { BLOG_SUBTITLE, BLOG_TITLE, getPosts, postUrl } from '../../lib/blog';

// Hugo served the blog's feed at this path, so keep it for existing subscribers.
export const GET: APIRoute = async ({ site }) => rss({
  title: BLOG_TITLE,
  description: BLOG_SUBTITLE,
  site: new URL('/blog/', site),
  items: (await getPosts()).map((post) => ({
    title: post.data.title,
    description: post.data.description,
    link: postUrl(post),
    pubDate: post.data.date
  }))
});
