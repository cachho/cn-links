import { pandabuyStringsMarketplaces } from '../../data/pandabuy';
import type { Marketplace } from '../../models';
import { extractId } from '../extractId';

function getMarketplace(link: URL): Marketplace {
  const marketplaceParam = link.searchParams.get('t');
  if (!marketplaceParam) {
    throw new Error('Missing marketplace parameter');
  }
  if (pandabuyStringsMarketplaces.has(marketplaceParam)) {
    const marketplace = pandabuyStringsMarketplaces.get(marketplaceParam);
    if (!marketplace) {
      throw new Error('Unsupported marketplace');
    }
    return marketplace;
  }
  throw new Error('Unsupported marketplace');
}

export function decodePandabuy(link: URL): {
  marketplace: Marketplace;
  id: string;
} {
  const marketplace = getMarketplace(link);

  const id = link.searchParams.get('id');
  if (!id) {
    throw new Error(`Missing ID parameter from link: ${link.href}`);
  }

  if (marketplace === 'weidian') {
    return { marketplace, id };
  }
  if (marketplace === 'taobao') {
    return { marketplace: 'taobao', id };
  }
  if (marketplace === '1688') {
    if (id !== '-1') {
      return { marketplace: '1688', id };
    }
    const o = link.searchParams.get('o');
    if (!o) {
      throw new Error('Missing o parameter from Pandabuy link with id = -1');
    }
    const innerLink = o.startsWith('https://')
      ? new URL(o)
      : new URL(`https://${o}`);

    return { marketplace: '1688', id: extractId(innerLink, '1688') };
  }
  if (marketplace === 'xianyu') {
    return { marketplace: 'xianyu', id };
  }
  throw new Error('Unsupported marketplace');
}
