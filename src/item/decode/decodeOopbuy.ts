import { oopbuyStringsMarketplaces } from '../../data/oopbuy';
import type { Marketplace } from '../../models';
import { generateRawLink } from '../generateRawLink';

const getMarketplace = (link: URL): Marketplace | null => {
  // https://www.oopbuy.com/product/weidian/7231813761?inviteCode=XIH3FJ85Q
  const marketplaceSegment = link.pathname.split('/')[2];
  if (!marketplaceSegment) {
    return null;
  }
  return oopbuyStringsMarketplaces.get(marketplaceSegment) ?? null;
};

/**
 * @internal
 * Decrypts the Oopbuy link by extracting the marketplace and id.
 *
 * @param {AgentURL} href - The Oopbuy link to decode. Not necessarily strongly typed.
 * @returns {RawURL} The decoded proper link as a URL object, or undefined if decryption failed.
 */
export function decodeOopbuy(link: URL) {
  if (link.searchParams.has('id') && link.searchParams.has('channel')) {
    const id = link.searchParams.get('id');
    if (!id) {
      throw new Error('No id provided in Oopbuy link.');
    }
    const marketplace = link.searchParams.get('channel');
    if (!marketplace) {
      throw new Error('No marketplace provided in Oopbuy link.');
    }
    return generateRawLink(marketplace as Marketplace, id);
  }
  const marketplace = getMarketplace(link);
  if (!marketplace) {
    throw new Error('Oopbuy item type not supported.');
  }
  const id = link.pathname.split('/')[3];
  if (!id) {
    throw new Error('No id provided in Oopbuy link.');
  }
  return generateRawLink(marketplace, id);
}
