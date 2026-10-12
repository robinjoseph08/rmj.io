import { defineCollection } from 'astro:content';
import { glob }             from 'astro/loaders';
import { z }                from 'astro/zod';

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    // Shown in post summaries and used for the meta description.
    description: z.string(),
    // Include a time and offset (e.g. 2026-10-12T10:00:00-07:00). A date on its
    // own is read as midnight UTC, which shows up as the day before.
    date: z.coerce.date(),
    // Drafts only show up in the dev server.
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    // The og:image for the post. Falls back to the blog's default image.
    image: z.string().optional()
  })
});

export const collections = { posts };
