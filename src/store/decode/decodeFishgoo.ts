import type { Marketplace } from '../../models';

export function decodeFishgoo(link: URL): {
  marketplace: Marketplace;
  id: string;
} {
  // https://www.fishgoo.com/#/home/shopProducts?source=taobao&shopId=512766495&sellerId=512766498&memberId=ref
  const linkWithoutHash = new URL(
    `https://www.fishgoo.com/${link.hash.replace('#/', '')}`
  );
  const source = linkWithoutHash.searchParams.get('source');
  const shopId =
    linkWithoutHash.searchParams.get('shopId') ||
    linkWithoutHash.searchParams.get('sellerId');

  if (!source || !shopId) {
    throw new Error('Invalid fishgoo link');
  }

  return {
    marketplace: source as Marketplace,
    id: shopId,
  };
}
