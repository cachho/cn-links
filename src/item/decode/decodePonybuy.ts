import { panglobalbuyStringsMarketplaces } from '../../data/panglobalbuy';
import type { Marketplace } from '../../models';
import { generateRawLink } from '../generateRawLink';

const getMarketplaceLegacy = (link: URL): Marketplace | null => {
  if (link.searchParams.get('platform') === 'weidian') {
    return 'weidian';
  }
  if (link.searchParams.get('platform') === 'taobao') {
    return 'taobao';
  }
  if (link.searchParams.get('platform') === '1688') {
    return '1688';
  }
  return null;
};

const getMarketplace = (segment: string): Marketplace | null => {
  return panglobalbuyStringsMarketplaces.get(segment) ?? null;
};

/**
 * @internal
 * Decrypts the Ponybuy link by extracting the marketplace and id.
 *
 * @param {AgentURL} href - The Ponybuy link to decode. Not necessarily strongly typed.
 * @returns {RawURL} The decoded proper link as a URL object, or undefined if decryption failed.
 */
export function decodePonybuy(link: URL) {
  if (link.searchParams.has('platform')) {
    // Legacy
    const marketplace = getMarketplaceLegacy(link);
    if (!marketplace) {
      throw new Error('Ponybuy shop type not supported.');
    }
    const id = link.searchParams.get('product_id');
    if (!id) {
      throw new Error('No id provided in Ponybuy link.');
    }
    return generateRawLink(marketplace, id);
  }
  // New format e.g. https://www.ponybuy.com/products/1/675330231400
  const linkSegments = link.pathname.split('/');
  const marketplace = getMarketplace(linkSegments[2]);
  if (!marketplace) {
    throw new Error('Ponybuy shop type not supported.');
  }
  const id = linkSegments[3];
  if (!id) {
    throw new Error('No id provided in Ponybuy link.');
  }
  return generateRawLink(marketplace, id);
}
