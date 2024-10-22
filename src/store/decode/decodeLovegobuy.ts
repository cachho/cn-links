import type { Marketplace } from '../../models';
import { marketplaces } from '../../models';

export function decodeLovegobuy(link: URL): {
  marketplace: Marketplace;
  id: string;
} {
  // https://www.lovegobuy.com/store/list?shopType=taobao&shopId=512766498&sellerId=3046765323&store_name=in[3046765323]&logo_url=
  const id = link.searchParams.get('shopId');
  if (!id) {
    throw new Error(`Missing ID parameter from link: ${link.href}`);
  }
  const marketplace = link.searchParams.get('shopType');
  if (!marketplace) {
    throw new Error('Missing marketplace parameter');
  }
  if (!marketplaces.includes(marketplace as Marketplace)) {
    throw new Error('Unsupported marketplace');
  }
  return { marketplace: marketplace as Marketplace, id };
}
