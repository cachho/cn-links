import type { Marketplace } from '../../models';
import { marketplaces } from '../../models';
import { allchinabuyStringsMarketplaces } from '../data/allchinabuy';

export function decodeAllChinaBuy(link: URL): {
  marketplace: Marketplace;
  id: string;
} {
  // https://www.allchinabuy.com/en/page/shop/shop/?shopid=1866344120&platform=WD
  const id = link.searchParams.get('shopid');
  if (!id) {
    throw new Error('Missing ID parameter');
  }
  const marketplaceParam = link.searchParams.get('platform');
  if (!marketplaceParam) {
    throw new Error('Missing marketplace parameter');
  }
  const marketplace = allchinabuyStringsMarketplaces.get(marketplaceParam);
  if (!marketplace) {
    throw new Error('Missing marketplace parameter');
  }
  if (!marketplaces.includes(marketplace as Marketplace)) {
    throw new Error('Unsupported marketplace');
  }
  return { marketplace: marketplace as Marketplace, id };
}
