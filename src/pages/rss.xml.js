import rss from '@astrojs/rss';
import { getPublishedPosts, getExcerpt, getPostUrl } from '../lib/content';
import { siteConfig } from '../site.config';

export async function GET(context) {
  const posts = await getPublishedPosts();

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: getExcerpt(post),
      pubDate: post.data.date,
      link: getPostUrl(post),
    })),
  });
}
