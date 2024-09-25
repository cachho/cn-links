import type { Marketplace } from '../../models';
import { panglobalbuyStringsMarketplaces } from '../../store/data/panglobalbuy';
import { generateRawLink } from '../generateRawLink';

const getMarketplace = (searchParams: URLSearchParams): Marketplace | null => {
  // https://www.oopbuy.com/product/weidian/7231813761?inviteCode=XIH3FJ85Q
  const marketplaceSegment = searchParams.get('type');
  if (marketplaceSegment === null) {
    return null;
  }
  return panglobalbuyStringsMarketplaces.get(marketplaceSegment) ?? null;
};

/**
 * @internal
 * Decrypts the Panglobalbuy link by extracting the marketplace and id.
 *
 * @param {AgentURL} href - The Panglobalbuy link to decode. Not necessarily strongly typed.
 * @returns {RawURL} The decoded proper link as a URL object, or undefined if decryption failed.
 */
export function decodePanglobalbuy(link: URL) {
  if (link.pathname !== '/' || !link.hash.startsWith('#/')) {
    throw new Error('Invalid Panglobalbuy link.');
  }
  const regularHref = link.href.replace('/#/', '/');
  const url = new URL(regularHref);
  const { searchParams } = url;
  const marketplace = getMarketplace(searchParams);
  if (!marketplace) {
    throw new Error('Panglobalbuy shop type not supported.');
  }
  const id = searchParams.get('offerId');
  if (!id) {
    throw new Error('No id provided in Panglobalbuy link.');
  }
  return generateRawLink(marketplace, id);
}
