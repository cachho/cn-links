import { sifubuyStringsMarketplaces } from '../../data/sifubuy';
import type { Marketplace } from '../../models';

function getMarketplace(link: URL): Marketplace {
  const marketplaceParam = link.searchParams.get('platformType');
  if (!marketplaceParam) {
    throw new Error('Missing marketplace parameter');
  }
  if (sifubuyStringsMarketplaces.has(marketplaceParam)) {
    const marketplace = sifubuyStringsMarketplaces.get(marketplaceParam);
    if (!marketplace) {
      throw new Error('Unsupported marketplace');
    }
    return marketplace;
  }
  throw new Error('Unsupported marketplace');
}

export function decodeSifubuy(link: URL): {
  marketplace: Marketplace;
  id: string;
} {
  const marketplace = getMarketplace(link);

  const id = link.searchParams.get('shopId');
  if (!id) {
    throw new Error(`Missing ID parameter from link: ${link.href}`);
  }

  return { marketplace, id };
}
