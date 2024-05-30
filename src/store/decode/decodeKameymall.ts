import type { Marketplace } from '../../models';
import { kameymallStringsMarketplaces } from '../data/kameymall';

export function decodeKameymall(link: URL): {
  marketplace: Marketplace;
  id: string;
} {
  const pathSegments = link.pathname.split('/');
  const storeSegment = pathSegments[pathSegments.length - 1];
  const [id, marketplaceId] = storeSegment.split('_');
  const marketplace = kameymallStringsMarketplaces.get(marketplaceId);

  if (!marketplace) {
    throw new Error('Unsupported marketplace');
  }

  return { marketplace, id };
}
