import { type Marketplace, marketplaces } from '../../models';

export function decodeGtbuy(link: URL): {
  marketplace: Marketplace;
  id: string;
} {
  // https://gtbuy.com/store?shopId=BBBl2NslJDcZ9gZPyhqSCuLmQ&channel=1688
  const marketplaceParam = link.searchParams.get('channel');
  if (!marketplaceParam) {
    throw new Error('Missing marketplace parameter');
  }
  const marketplace = marketplaceParam.toLowerCase();
  console.log('🚀 ~ decodeGtbuy ~ marketplace:', marketplace);
  if (!marketplaces.includes(marketplace as Marketplace)) {
    throw new Error('Unsupported marketplace for GTBuy');
  }
  const id = link.searchParams.get('shopId');
  if (id === null) {
    throw new Error(`Missing ID parameter from link: ${link.href}`);
  }
  return { marketplace: marketplace as Marketplace, id };
}
