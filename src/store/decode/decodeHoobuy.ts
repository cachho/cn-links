import type { Marketplace } from '../../models';
import { marketplaces } from '../../models';
import { hoobuyStringsMarketplaces } from '../data/hoobuy';

export function decodeHoobuy(link: URL): {
  marketplace: Marketplace;
  id: string;
} {
  // https://hoobuy.com/shop/1/676198570
  const segments = link.pathname.split('/').filter((s) => s);
  if (segments.length < 3) {
    throw new Error('Invalid path, link cannot be handled');
  }
  const id = segments[2];
  if (!id) {
    throw new Error(`Missing ID parameter from link: ${link.href}`);
  }
  const marketplaceSegment = segments[1];
  if (!marketplaceSegment) {
    throw new Error('Missing marketplace parameter');
  }
  const marketplace = hoobuyStringsMarketplaces.get(marketplaceSegment);
  if (!marketplaces.includes(marketplace as Marketplace)) {
    throw new Error('Unsupported marketplace');
  }
  return { marketplace: marketplace as Marketplace, id };
}
