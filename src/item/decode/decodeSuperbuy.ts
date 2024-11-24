import { extractInnerParam } from '../../lib/extractInnerParam';

export function decodeSuperbuy(url: URL) {
  if (url.href.includes('/#/')) {
    const urlNoHash = new URL(url.href.replace('/#/', '/'));
    const innerParam = extractInnerParam(urlNoHash);
    if (innerParam) {
      return new URL(innerParam);
    }
  }
  throw new Error(
    `Could not extract inner Superbuy link from ${url.href}. This is expected behaviour and should use the fallback.`
  );
}
