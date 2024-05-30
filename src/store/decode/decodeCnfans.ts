import type { Marketplace } from '../../models';
import { marketplaces } from '../../models';

export function decodeCnFans(link: URL): {
  marketplace: Marketplace;
  id: string;
} {
  // https://cnfans.com/shops/?shop_type=taobao&num=1&sort=default&shop_id=277184856
  const id = link.searchParams.get('shop_id');
  if (!id) {
    throw new Error(`Missing ID parameter from link: ${link.href}`);
  }
  const marketplace = link.searchParams.get('shop_type');
  if (!marketplace) {
    throw new Error('Missing marketplace parameter');
  }
  if (!marketplaces.includes(marketplace as Marketplace)) {
    throw new Error('Unsupported marketplace');
  }
  return { marketplace: marketplace as Marketplace, id };
}
