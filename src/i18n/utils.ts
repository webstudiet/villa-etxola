import { ui, defaultLang, routes, type Lang, type RouteKey } from './ui';

export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  if (first === 'en') return 'en';
  return defaultLang;
}

export function useTranslations<L extends Lang>(lang: L) {
  return function t<K extends keyof (typeof ui)[L]>(key: K): (typeof ui)[L][K] {
    return ui[lang][key] ?? (ui[defaultLang] as any)[key];
  };
}

export function localizedPath(lang: Lang, key: RouteKey): string {
  return routes[lang][key];
}

// Maps a key from the current route back so the language switcher links to
// the equivalent page in the other locale.
export function getRouteKeyForPath(path: string): RouteKey | null {
  for (const lang of ['fr', 'en'] as const) {
    for (const [key, value] of Object.entries(routes[lang])) {
      if (value === path) return key as RouteKey;
    }
  }
  return null;
}

export function getAlternateLang(lang: Lang): Lang {
  return lang === 'fr' ? 'en' : 'fr';
}
