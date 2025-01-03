import { acbuyStringsMarketplaces } from '../../data/acbuy';
import type { Marketplace } from '../../models';
import { generateRawLink } from '../generateRawLink';

const getMarketplace = (searchParams: URLSearchParams): Marketplace | null => {
  // https://www.oopbuy.com/product/weidian/7231813761?inviteCode=XIH3FJ85Q
  const marketplaceSegment = searchParams.get('source');
  if (marketplaceSegment === null) {
    return null;
  }
  return acbuyStringsMarketplaces.get(marketplaceSegment) ?? null;
};

/**
 * @internal
 * Decrypts the Acbuy link by extracting the marketplace and id.
 *
 * @param {AgentURL} href - The Acbuy link to decode. Not necessarily strongly typed.
 * @returns {RawURL} The decoded proper link as a URL object, or undefined if decryption failed.
 */
export function decodeAcbuy(link: URL) {
  const marketplace = getMarketplace(link.searchParams);
  if (!marketplace) {
    throw new Error('Acbuy marketplace not found.');
  }
  const id = link.searchParams.get('id');
  if (!id) {
    throw new Error('No id provided in MuleBuy link.');
  }
  return generateRawLink(marketplace, id);
}
