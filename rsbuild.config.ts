import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    title: 'Fit - K4Tech',
    favicon: './public/favicon.svg',
    meta: {
      // Basic meta tags
      description: 'K4Tech Fitness Schedule - View and join our fitness activities including gym sessions, cardio training, circuits, and sports.',
      keywords: 'fitness, gym, cardio, strength training, workout schedule, K4Tech',
      author: 'K4Tech.net',

      // Open Graph meta tags for social media embeds
      'og:title': 'Fit - K4Tech',
      'og:description': 'K4Tech Fitness Schedule - View and join our fitness activities including gym sessions, cardio training, circuits, and sports.',
      'og:type': 'website',
      'og:url': 'https://fit.k4tech.net',
      'og:site_name': 'Fit - K4Tech',

      // Twitter Card meta tags
      'twitter:card': 'summary',
      'twitter:title': 'Fit - K4Tech',
      'twitter:description': 'K4Tech Fitness Schedule - View and join our fitness activities including gym sessions, cardio training, circuits, and sports.',

      // Additional meta tags
      'theme-color': '#0a0a0a',
      viewport: 'width=device-width, initial-scale=1.0',
    },
  },
});
