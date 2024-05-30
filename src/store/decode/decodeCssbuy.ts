import type { Marketplace } from '../../models';
import { cssbuyStringsMarketplaces } from '../data/cssbuy';

export function decodeCssbuy(link: URL): {
  marketplace: Marketplace;
  id: string;
} {
  const marketplaceParam = link.searchParams.get('t');
  if (!marketplaceParam) {
    throw new Error(`Missing marketplace parameter from link: ${link.href}`);
  }
  const marketplace = cssbuyStringsMarketplaces.get(marketplaceParam);
  if (!marketplace) {
    throw new Error('Unsupported marketplace');
  }
  const id = link.searchParams.get('shop');
  if (!id) {
    throw new Error(`Missing ID parameter from link: ${link.href}`);
  }

  if (marketplace === '1688') {
    // It looks like CSSbuy currently only supports mobile shops
    return { marketplace: '1688', id: `b2b-${id}` };
  }

  return { marketplace, id };
}
