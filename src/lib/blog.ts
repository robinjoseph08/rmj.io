import { type CollectionEntry, getCollection } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

export const BLOG_TITLE = 'robin\'s blog';
export const BLOG_SUBTITLE = 'just a random collection of things i\'m working on';
export const BLOG_DESCRIPTION = 'Robin Joseph\'s personal blog';
export const BLOG_IMAGE = '/blog/images/main/og.png';

const WORDS_PER_MINUTE = 220;
const TIME_ZONE = 'America/Los_Angeles';

// Newest first. Drafts only show up in the dev server.
export const getPosts = async (): Promise<Post[]> => {
  const posts = await getCollection('posts', (post) => import.meta.env.DEV || !post.data.draft);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
};

// Tags are grouped by slug so ones that only differ in case end up together,
// using whichever spelling shows up first.
export const getTags = (posts: Post[]): Map<string, Post[]> => {
  const tags = new Map<string, { name: string; posts: Post[] }>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      const entry = tags.get(tagSlug(tag)) ?? { name: tag, posts: [] };
      entry.posts.push(post);
      tags.set(tagSlug(tag), entry);
    }
  }
  const sorted = [...tags.values()].sort((a, b) => a.name.localeCompare(b.name));
  return new Map(sorted.map(({ name, posts }) => [name, posts]));
};

export const postUrl = (post: Post) => `/blog/posts/${post.id}/`;

export const tagSlug = (tag: string) => tag.toLowerCase().replace(/\s+/g, '-');

export const tagUrl = (tag: string) => `/blog/tags/${tagSlug(tag)}/`;

// e.g. Mar 25, 2020
export const formatDate = (date: Date) => date.toLocaleDateString('en-US', {
  day: 'numeric',
  month: 'short',
  timeZone: TIME_ZONE,
  year: 'numeric'
});

// e.g. 2020-03-25
export const formatShortDate = (date: Date) => date.toLocaleDateString('en-CA', { timeZone: TIME_ZONE });

// e.g. 6 minutes
export const readingTime = (post: Post) => {
  const text = (post.rendered?.html ?? '').replace(/<[^>]*>/g, ' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
  return `${minutes} minute${minutes === 1 ? '' : 's'}`;
};
