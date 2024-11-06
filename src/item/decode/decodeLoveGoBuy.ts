import { lovegobuyStringsMarketplaces } from '../../data/lovegobuy';
import { type Marketplace } from '../../models';
import { generateRawLink } from '../generateRawLink';

const getMarketplace = (link: URL): Marketplace | null => {
  // 1688 is ali_1688 in the URL, otherwise we could just use the raw param value
  const shopParam = link.searchParams.get('shop_type');
  if (shopParam && lovegobuyStringsMarketplaces.get(shopParam)) {
    return lovegobuyStringsMarketplaces.get(shopParam)!;
  }
  const platformParam = link.searchParams.get('platform');
  if (platformParam && lovegobuyStringsMarketplaces.get(platformParam)) {
    return lovegobuyStringsMarketplaces.get(platformParam)!;
  }
  return null;
};

/**
 * @internal
 * Decrypts the lovegobuy link by extracting the marketplace and id.
 *
 * @param {AgentURL} href - The lovegobuy link to decode. Not necessarily strongly typed.
 * @returns {RawURL} The decoded proper link as a URL object, or undefined if decryption failed.
 */
export function decodeLovegobuy(link: URL) {
  // Lovegobuy changed their link structure to not use a hash anymore.
  // We keep this function for backwards compatibility.

  // New lovegobuy link structure
  if (
    (link.searchParams.has('platform') || link.searchParams.has('shop_type')) &&
    (link.searchParams.has('goodsId') || link.searchParams.has('id')) // support for both params
  ) {
    const marketplace = getMarketplace(link);
    if (!marketplace) {
      throw new Error(
        `This type of lovegobuy link is not a compatible product link (no marketplace): ${link.href}`
      );
    }
    const id = link.searchParams.get('id') || link.searchParams.get('goodsId');
    if (id === null) {
      throw new Error(
        `This type of lovegobuy link is not a compatible product link (no id): ${link.href}`
      );
    }
    return generateRawLink(marketplace as Marketplace, id);
  }

  // We assume that lovegobuy is using a hash to store the search params
  // Throw error if hash is empty
  if (!link.hash) {
    throw new Error(
      `This type of lovegobuy link is not a compatible product link (no hash): ${link.href}`
    );
  }
  // Load search params from hash
  const searchParamsInHash = link.hash.split('?')[1];
  if (!searchParamsInHash) {
    throw new Error(
      `This type of lovegobuy link is not a compatible product link (no search params in hash): ${link.href}`
    );
  }
  const searchParams = new URLSearchParams(searchParamsInHash);

  const marketplace = getMarketplace(
    new URL(`https://lovegobuy.com/?${searchParams}`)
  );
  if (!marketplace) {
    throw new Error(
      `This type of lovegobuy link is not a compatible product link (no marketplace): ${link.href}`
    );
  }
  const id = searchParams.get('goodsId');
  if (id === null) {
    throw new Error(
      `This type of lovegobuy link is not a compatible product link (no id): ${link.href}`
    );
  }
  return generateRawLink(marketplace as Marketplace, id);
}
