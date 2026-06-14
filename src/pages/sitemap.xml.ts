import type { APIRoute } from 'astro';
import { routes } from '../i18n/ui';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const origin = site?.toString().replace(/\/$/, '') ?? 'https://www.villa-etxola.com';
  const keys = Object.keys(routes.fr) as Array<keyof typeof routes['fr']>;
  const now = new Date().toISOString();

  const urls = keys
    .map((key) => {
      const fr = `${origin}${routes.fr[key]}`;
      const en = `${origin}${routes.en[key]}`;
      return `
  <url>
    <loc>${fr}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${key === 'home' ? '1.0' : '0.8'}</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="${fr}" />
    <xhtml:link rel="alternate" hreflang="en" href="${en}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${fr}" />
  </url>
  <url>
    <loc>${en}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${key === 'home' ? '0.9' : '0.7'}</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="${fr}" />
    <xhtml:link rel="alternate" hreflang="en" href="${en}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${fr}" />
  </url>`;
    })
    .join('');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}
</urlset>`;

  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
