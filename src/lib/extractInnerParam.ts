import type { AgentURL } from '../models';

export function extractInnerParam(link: AgentURL) {
  if (link.searchParams.get('url')) {
    return link.searchParams.get('url');
  }

  // Try to get it from the hash
  if (link.pathname && link.hash.startsWith('#/')) {
    const url = new URL(link.href.replace('/#/', '/'));
    if (url.searchParams.get('url')) {
      return url.searchParams.get('url');
    }
    if (url.searchParams.get('productLink')) {
      return url.searchParams.get('productLink');
    }
  }

  return null;
}
