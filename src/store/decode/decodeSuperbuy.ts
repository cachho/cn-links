import type { Marketplace } from '../../models';
import { marketplaces } from '../../models';
import { superbuyStringsMarketplaces } from '../data/superbuy';

export function decodeSuperbuy(link: URL): {
  marketplace: Marketplace;
  id: string;
} {
  // https://www.superbuy.com/en/page/rebates/shop/?shopid=106592833&platform=TB
  const id = link.searchParams.get('shopid');
  if (!id) {
    throw new Error(`Missing ID parameter from link: ${link.href}`);
  }
  const marketplaceParam = link.searchParams.get('platform');
  if (!marketplaceParam) {
    throw new Error('Missing marketplace parameter');
  }
  const marketplace = superbuyStringsMarketplaces.get(marketplaceParam);
  if (!marketplace) {
    throw new Error('Missing marketplace parameter');
  }
  if (!marketplaces.includes(marketplace as Marketplace)) {
    throw new Error('Unsupported marketplace');
  }
  return { marketplace: marketplace as Marketplace, id };
}
