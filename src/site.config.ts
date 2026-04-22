export const siteConfig = {
  site: 'https://zsms.me',
  title: 'Blog by Zhong',
  subtitle: 'Build web apps with love',
  description:
    'Personal notes about web, mobile, and programming, rebuilt with Astro for long-term maintainability.',
  author: {
    name: 'Zhong',
    bio: 'I build web and mobile applications, and use this blog to keep a durable record of what I learn.',
    photo: '/photo.jpg',
    email: 'i@zsms.me',
    github: 'https://github.com/heemoe',
  },
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about/' },
  ],
} as const;

export const cloudflarePagesConfig = {
  productionBranch: 'main',
  buildCommand: 'npm run build',
  buildOutputDirectory: 'dist',
} as const;
