import type { Marketplace } from '../../models';
import { sifubuyStringsMarketplaces } from '../../store/data/sifubuy';
import { generateRawLink } from '../generateRawLink';

const getMarketplace = (link: URL): Marketplace | null => {
  // https://www.oopbuy.com/product/weidian/7231813761?inviteCode=XIH3FJ85Q
  const marketplaceSegment = link.searchParams.get('type');
  if (!marketplaceSegment) {
    throw new Error('Missing marketplace parameter type is required');
  }
  return sifubuyStringsMarketplaces.get(marketplaceSegment) ?? null;
};

/**
 * @internal
 * Decrypts the Sifubuy link by extracting the marketplace and id.
 *
 * @param {AgentURL} href - The Sifubuy link to decode. Not necessarily strongly typed.
 * @returns {RawURL} The decoded proper link as a URL object, or undefined if decryption failed.
 */
export function decodeSifubuy(link: URL) {
  if (link.searchParams.has('productUrl')) {
    const url = link.searchParams.get('productUrl');
    if (!url) {
      throw new Error('Invalid Sifubuy link.');
    }
    return new URL(decodeURIComponent(url));
  }
  const marketplace = getMarketplace(link);
  if (!marketplace) {
    throw new Error('Sifubuy shop type not supported.');
  }
  const id = link.searchParams.get('id');
  if (!id) {
    throw new Error('No id provided in Sifubuy link.');
  }
  return generateRawLink(marketplace, id);
}
