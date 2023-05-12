import { generateProperLink } from './generateProperLink';

export function decryptCssbuy(link: string | URL): URL | null {
  const url = typeof link === 'string' ? new URL(link) : link;

  if (url.pathname.startsWith('/item-micro')) {
    const id = url.pathname.split('-')[2].split('.')[0];
    if (id) {
      return new URL(generateProperLink('weidian', id));
    }
  }
  if (url.pathname.startsWith('/item-1688')) {
    const id = url.pathname.split('-')[2].split('.')[0];
    if (id) {
      return new URL(generateProperLink('1688', id));
    }
  }
  if (url.pathname.startsWith('/item')) {
    const id = url.pathname.split('-')[1].split('.')[0];
    if (id) {
      return new URL(generateProperLink('taobao', id));
    }
  }
  return null;
}
