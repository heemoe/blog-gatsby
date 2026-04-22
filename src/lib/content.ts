import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogEntry = CollectionEntry<'blog'>;

export const sortPosts = (posts: BlogEntry[]) =>
  posts.slice().sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

export const getPublishedPosts = async () =>
  sortPosts(await getCollection('blog', ({ data }) => !data.draft));

export const getPostUrl = (post: Pick<BlogEntry, 'slug'>) => `/posts/${post.slug}/`;

export const getExcerpt = (post: BlogEntry) => {
  const description = post.data.description.trim();

  if (description.length > 0) {
    return description;
  }

  const excerpt = post.body
    .replace(/^---[\s\S]*?---/, '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]+`/g, ' ')
    .replace(/!\[[^\]]*]\([^)]+\)/g, ' ')
    .replace(/\[[^\]]+]\([^)]+\)/g, '$1')
    .replace(/[#>*_-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return excerpt.slice(0, 160);
};
