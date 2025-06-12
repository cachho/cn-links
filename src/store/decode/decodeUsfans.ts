import { usfansStringsMarketplaces } from '../../data/usfans';
import type { Marketplace } from '../../models';

export function decodeUsfans(link: URL): {
  marketplace: Marketplace;
  id: string;
} {
  // https://www.usfans.com/search?channel=2&shopId=365827711
  const marketplaceParam = link.searchParams.get('channel');
  if (!marketplaceParam) {
    throw new Error('Missing marketplace parameter');
  }
  const marketplace = usfansStringsMarketplaces.get(marketplaceParam);
  if (!marketplace) {
    throw new Error('Unsupported marketplace');
  }
  const id = link.searchParams.get('shopId');
  if (id === null) {
    throw new Error(`Missing ID parameter from link: ${link.href}`);
  }
  return { marketplace, id };
}
