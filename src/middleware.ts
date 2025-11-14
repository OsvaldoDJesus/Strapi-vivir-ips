import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  // Headers de seguridad y performance
  const response = next();
  
  response.then((res) => {
    // Cache agresivo para assets estáticos (1 año)
    if (context.url.pathname.match(/\.(jpg|jpeg|png|webp|avif|svg|woff|woff2|ico)$/)) {
      res.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    }
    
    // Cache para CSS/JS (1 año con hash)
    if (context.url.pathname.match(/\.(css|js)$/) && context.url.pathname.includes('assets')) {
      res.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    }
    
    // Cache para páginas HTML (1 hora con revalidación)
    if (!context.url.pathname.match(/\.(jpg|jpeg|png|webp|avif|svg|woff|woff2|js|css|ico)$/)) {
      res.headers.set('Cache-Control', 'public, max-age=3600, must-revalidate');
    }
    
    // Preconnect hints para recursos externos
    const links = [
      '<https://dedicated-gem-1b82c41766.media.strapiapp.com>; rel=preconnect; crossorigin',
      '<https://fonts.googleapis.com>; rel=preconnect',
      '<https://fonts.gstatic.com>; rel=preconnect; crossorigin',
      '<https://cdnjs.cloudflare.com>; rel=dns-prefetch',
    ];
    res.headers.set('Link', links.join(', '));
    
    // Security headers
    res.headers.set('X-Content-Type-Options', 'nosniff');
    res.headers.set('X-Frame-Options', 'SAMEORIGIN');
    res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // Nota: Cookie __cf_bm de Cloudflare (Strapi CDN) es de terceros y no se puede controlar.
    // Es usada por Cloudflare para bot management. No afecta funcionalidad del sitio.
  });
  
  return response;
});
